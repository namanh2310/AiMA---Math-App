from flask import request, jsonify
import numpy as np
from sympy import *

from latex2sympy2 import latex2sympy, latex2latex
from pix2text import Pix2Text, merge_line_texts
from pix2tex import cli as pix2tex

from io import BytesIO
import os
from PIL import Image
import PIL
import base64
import re
import requests


class AIController:
    def AIforWeb():
        if request.method == "POST":
            format = request.json['format']
            if int(PIL.__version__[0]) < 9:
                print('Mandatory restart: Execute this cell again!')
                os.kill(os.getpid(), 9)
            image_base64 = bytes(format, 'utf-8')
            # image_base64 = base64.b64encode(image_data)
            image_bytes = BytesIO(base64.b64decode(image_base64))
            print(image_bytes)
            img = Image.open(image_bytes)
            model = pix2tex.LatexOCR()
            math = model(img)
            raw_data = repr(math)
            expr = sympify(raw_data)
            print(raw_data)

            temp_symbol = '###'
            step = []
            sympy_converter = latex2sympy(expr)
            print('==================================',sympy_converter)
            pattern = r"\b\w+\(([^,]+)"
            pattern_exception = r'\([^,]+,\s*[^,]+,\s*[^)]+\)'
            x = Symbol('x')
            if '=' not in expr:
                for arg in sympy_converter.args:
                        if len(sympy_converter.args) == 2:
                            match = re.match(pattern_exception, str(sympy_converter.args[1]))  
                            if match:
                                try:
                                    result = integrate(arg, x)
                                    conclu = sympify(sympy_converter).doit()
                                    step.append([str(arg).replace('**', temp_symbol).replace('*x', 'x').replace(temp_symbol, '^'), 
                                            str(result).replace('**', temp_symbol).replace('*', '').replace(temp_symbol, '^'),
                                            str(conclu).replace('**', temp_symbol).replace('*', '').replace(temp_symbol, '^')
                                            ])
                                    print(step[0])
                                    break
                                except:
                                    break
                            else:
                                if 'Integral' in str(arg):
                                    matches = re.findall(pattern, str(arg))
                                    for match in matches:
                                        result = integrate(match, x)
                                        conclu = sympify(arg).doit()
                                        step.append([match.replace('**', temp_symbol).replace('*x', 'x').replace(temp_symbol, '^'), 
                                            str(result).replace('**', temp_symbol).replace('*', '').replace(temp_symbol, '^'),
                                            str(conclu).replace('**', temp_symbol).replace('*', '').replace(temp_symbol, '^')
                                            ])
                        else:
                            if 'Integral' in str(arg):
                                matches = re.findall(pattern, str(arg))
                                for match in matches:
                                    result = integrate(match, x)
                                    conclu = sympify(arg).doit()
                                    step.append([match.replace('**', temp_symbol).replace('*x', 'x').replace(temp_symbol, '^'), 
                                            str(result).replace('**', temp_symbol).replace('*', '').replace(temp_symbol, '^'),
                                            str(conclu).replace('**', temp_symbol).replace('*', '').replace(temp_symbol, '^')
                                            ])
               
           
            
        
        # return jsonify({'result': latex2latex(expr), 'eq': str(math)})
        return jsonify({'eq': str(math), 'res': latex2latex(expr), 'step': step})

    def AIforApp():
        if request.method == "POST":
            img = request.json['img']
            
            if int(PIL.__version__[0]) < 9:
                print('Mandatory restart: Execute this cell again!')
                os.kill(os.getpid(), 9)

            response = requests.get(img)
            image_data = response.content

            image_base64 = base64.b64encode(image_data)
            image_bytes = BytesIO(base64.b64decode(image_base64))

            img = Image.open(image_bytes)
            p2t = Pix2Text(analyzer_config=dict(model_name='mfd'))
            outs = p2t(img, resized_shape=608)
            only_text = merge_line_texts(outs, auto_line_break=True).lower()

            if ' = ' in only_text:
                only_text = only_text.replace('$$', '').replace('\\dx', '')
            elif '=' in only_text:
                only_text = only_text.replace('=', ' = ').replace('$$', '').replace('\\dx', '')

            only_text = r'' + only_text

            if 'golden section search' in only_text:
                equation = ' '.join(only_text.splitlines())
                pattern = r'f\(x\) = (.+?)(?:\s[a-zA-Z]|$)'
                match = re.search(pattern, equation)
                type = None
            
                if 'minimum' in equation:
                    type = 'minimum'
                else:
                    type = 'maximum'

                if match:
                    function_expression = match.group(1)
                    
                    return jsonify({'function': function_expression,
                            'algorithm': 'Golden Section', 
                            'type': type,
                            'complex': True})

            else:
                equation = ' '.join(only_text.splitlines()).replace('$$','').replace(" ", "").replace('\\dx', '')
                print(equation)
                return jsonify({'eq': equation, 'complex': False})