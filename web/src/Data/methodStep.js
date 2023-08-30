const GSSDATA = [
  {
    type: "text",
    stepTitle: "Calculate",
    stepContent: (data) => [
      `d = R(x_l - x_u) = \\frac{\\sqrt{5} - 1}{2} (${data[0]?.xu} - ${data[0]?.xl}) = ${data[0]?.d}`,
      `x_1 = x_l + d = ${data[0].xl} + ${data[0].d} = ${data[0].x1}`,
      `x_2 = x_u - d = ${data[0].xu} - ${data[0].d} = ${data[0].x2}`,
    ],
  },

  {
    type: "text",
    stepTitle: "Check",
    stepContent: (data, comp) => [
      `f(x_1) = ${data[0].f1} ${comp} f(x_2) = ${data[0].f2}`,
      `\\rightarrow x_l = x_{opt} = x_2 = ${data[0].x2}`,
    ],
  },

  {
    type: "text",
    stepTitle: "Error",
    stepContent: (data) => [
      `e_a = (1 - R) * \\frac{interval}{x_{opt}} \\cdot 100`,
      `= (1 - \\frac{\\sqrt{5} - 1}{2})\\frac{${data[0].xu - data[0].xl}}{ ${
        data[0].x2
      }}*100=${data[0].ea}`,
    ],
  },
  {
    type: "table",
    tableHeader: [
      "i",
      "x_l",
      "x_2",
      "f(x_2)",
      "x_1",
      "f(x_1)",
      "x_u",
      "d",
      "e_a%",
    ],
    tableValue: (data) => [
      data.iterator,
      data.xl,
      data.x2,
      data.f2,
      data.x1,
      data.f1,
      data.xu,
      data.d,
      data.ea,
    ],
  },
];

const NMDATA = [
  {
    type: "text",
    stepTitle: "Calculate",
    stepContent: (data, funct, first_deri, second_deri) => [
      `f(x) = ${funct}`,
      `\\rightarrow f(${data[0].x0})=${data[0].fx}`,
      `f'(x) = ${first_deri}`,
      `\\rightarrow f'(${data[0].x0})=${data[0].f_1st})`,
      `f'(x) = ${first_deri}`,
      `\\rightarrow f"(${data[0].x0})=${data[0].f_2nd}`,
    ],
  },

  {
    type: "text",
    stepTitle: "Subtitute",
    stepContent: (data) => [
      ` x_{1} = x_i - \\frac{f'(x_0)}{f''(x_0)}`,
      `x_{1} = \\frac{${data[0].f_1st}}{${data[0].f_2nd}} = ${data[1].x0}`,
    ],
  },

  {
    type: "table",
    tableHeader: ["i", "x", "f(x)", "f'(x)", 'f"(x)', "e_a%"],
    tableValue: (data) => [
      data.iterator,
      data.x0,
      data.fx,
      data.f_1st,
      data.f_2nd,
      data.ea,
    ],
  },
];

export { GSSDATA, NMDATA };
