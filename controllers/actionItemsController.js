var db = require('../models');

// GET '/api/bills/:billsId/actionItems'
function index(req, res) {
  db.bill.findById(req.params.billId, function(err, foundBill) {
    res.json(foundBill.actionItems);
  });
}

// POST '/api/bills/:billsId/actionItems'
function create(req, res) {
  db.bill.findById(req.params.billId, function(err, foundBill) {
    var newActionItems = new db.actionItem(req.body);
    foundBill.actionItems.push(newActionItems);
    foundBill.save(function(err, savedBill) {
      res.json(newActionItems);
    });
  });
}

// DELETE '/api/bills/:billId/actionItem/:actionItemId'
function destroy(req, res) {
  db.bill.findById(req.params.billId, function(err, foundBill) {
    var correctActionItem = foundBill.actionItems.id(req.params.actionItemId);
    if (correctActionItem) {
      correctActionItem.remove();
      foundBill.save(function(err, saved) {
        res.json(correctActionItem);
      });
    } else {
      res.send(404);
    }
  });
}

// GET '/api/bills/:billId'
function show(req, res) {
  db.bill.findById(req.params.billId, function(err, foundBill) {
    var correctActionItem = foundBill.actionItems.id(req.params.actionItemId);
    if (correctActionItem) {
      res.json(correctActionItem);
    } else {
      res.send(404);
    }
  });
}

//PUT '/api/bills/:billId/actionItems/:actionItemId'
function update(req, res) {
  db.bill.findById(req.params.billId, function(err, foundBill) {
    // find the action items within bill
    var correctActionItem = foundBill.actionItems.id(req.params.actionItemId);
    if (correctActionItem) {
      correctActionItem.title = req.body.title;
      correctActionItem.rep1Name = req.body.rep1Name;
      correctActionItem.rep2Name = req.body.rep2Name;
      correctActionItem.rep3Name = req.body.rep3Name;
      correctActionItem.rep1ActionUrl = req.body.rep1ActionUrl;
      correctActionItem.rep2ActionUrl = req.body.rep2ActionUrl;
      correctActionItem.rep3ActionUrl = req.body.rep3ActionUrl;
      correctActionItem.dueDate = req.body.dueDate;
      correctActionItem.status = req.body.status;

      foundBill.save(function(err, saved) {
        res.json(correctActionItem);
      });
    } else {
      res.send(404);
    }
  });
}

module.exports = {
  index: index,
  create: create,
  update: update,
  destroy: destroy,
  show: show
};
