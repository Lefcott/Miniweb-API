import calculations from './calculations';

export const make_calculations = client_document => {
  calculations.forEach(calculation => {
    if (calculation.project_code !== client_document.project_code) return;
    if (calculation.entity !== client_document.entity) return;
    calculation.calculate(client_document);
  });
};
