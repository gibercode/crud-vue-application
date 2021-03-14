const data = [
  { name: 'Manuel', document: 'V-24797283', state: 'Distrito-Capital', concessionaire: 'Ford' },
  { name: 'Alejandro', document: 'V-2687292', state: 'Carabobo', concessionaire: 'Peugeot' },
  { name: 'Maria', document: 'V-1279272', state: 'Zulia', concessionaire: 'Porsche' }
];

export const setStorage = (userData) => {
  const newData = { data, ...userData }
  localStorage.setItem('data', JSON.stringify(newData));
};

export const getStorage = () => {
  const data = localStorage.getItem('data');
  const parseData = JSON.parse(data);
  return parseData;
}

export const updateStorage = (value) => {
  const email = getStorage()?.email;
  const newData = { data:value, email }
  localStorage.setItem('data', JSON.stringify(newData));
}

export const clearStorage = () => localStorage.clear()
