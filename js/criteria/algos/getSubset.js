//logic: e.g. ['Adobe Photoshop', 'AND', 'Art & Illustration']
// we will be using javasript's default precedence: && goes before ||
// e.g.
// boolExp1 || boolExp2 && boolExp3 || boolExp4
// acts like
// boolExp1 || (boolExp2 && boolExp3) || boolExp4

function getSubset(logic) {
  const data = globalState.data;

  const category = logic.filter((site, idx) => idx % 2 === 0);
  const ops = logic.filter((site, idx) => idx % 2 === 1);

  const subset = data.filter(({ categories }) => {
    let toInclude = categories.includes(category[0]);

    for (let i = 1; i < category.length; i++) {
      const op = ops[i - 1];
      if (op === 'AND') {
        toInclude = toInclude && categories.includes(category[i]);
      } else if (op === 'OR') {
        toInclude = toInclude || categories.includes(category[i]);
      }
    }

    return toInclude;
  });

  return subset;
}
