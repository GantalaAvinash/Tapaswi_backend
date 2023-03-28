const Visitor = require("../Models/visitor");

exports.visitor=(req,res)=>{
    const { visitorCount } = req.body;
    const visitor = new Visitor({ visitorCount: visitorCount });
    visitor.save((err) => {
        if (err) {
            res.status(500).send('Error saving visitor to database');
        } else {
            res.status(200).send('Visitor saved to database');
        }
    });
}

exports.getVisitor=(req,res)=>{
    Visitor.find({},(err,visitors)=>{
        if(err){
            res.status(500).send('Error fetching visitors from database');
        }else{
            res.status(200).send(visitors);
        }
    })
}


exports.incrementVisitorCount = (req, res) => {
  Visitor.findOneAndUpdate({}, { $inc: { visitorCount: 1 } }, { new: true }, (err, visitor) => {
    if (err) {
      return res.status(500).send({ message: 'Error incrementing visitor count in database' });
    }
    if (!visitor) {
      const newVisitor = new Visitor({ visitorCount: 1 });
      return newVisitor.save(err => {
        if (err) {
          return res.status(500).send({ message: 'Error saving new visitor count to database' });
        }
        res.status(201).send({ visitorCount: newVisitor.visitorCount });
      });
    }
    res.status(200).send({ visitorCount: visitor.visitorCount });
  });
};
