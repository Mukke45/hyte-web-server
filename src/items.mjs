// mock data for simple API
const items = [
  {id: 1, name: 'Item 1'},
  {id: 2, name: 'Item 2'},
  {id: 3, name: 'Item kolme'},
  {id: 4, name: 'Item neljä'},
];

const getItems = (req, res) => {
  res.json(items);
};

// palauta vain se objekti, jonka id vastaa pyydettyä, muuten 404
const getItemById =  (req, res) => {
  // console.log('requested item id', req.params.id);
  const itemFound = items.find(item => item.id == req.params.id);
  // console.log('found item', itemFound);
  if (itemFound) {
    res.json(itemFound);
  } else {
    res.status(404).json({error: 'not found'});
  }
};

const postItem = (req, res) => {
  // TODO: lisää postattu item items-taulukkoon
  res.json({message: 'item created'});
};

const deleteItem = (req, res) => {
  // TODO: implement delete item
  // tip: array.findIndex() ?
  res.json({message: 'delete placeholder'});
};

const putItem = (req, res) => {
  // TODO: implement modify item
  res.json({message: 'put placeholder'});
};


export {getItems, getItemById, postItem, deleteItem, putItem};
