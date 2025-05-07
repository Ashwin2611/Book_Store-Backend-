const book = require("../model/BookModel");
exports.getAllProduct = async (req, res) => {
  try {
    const getProduct = await book.find({}).select("-_id -__v");
    res.status(200).json(getProduct);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.addBook = async (req, res, next) => {
  try {
    // console.log(req.body)
    if (!req.body.id) {
      let base64Image = "";

      // Convert uploaded image to Base64
      if (req.file) {
        base64Image = `data:${
          req.file.mimetype
        };base64,${req.file.buffer.toString("base64")}`;
      }
      // const count=await book.countDocuments()
      const filter = await book.find({});
      const val = filter[filter.length - 1] ? filter[filter.length - 1] : 0;
      console.log("value:" + val.id);
      const st = val.id ? val.id : 0;
      const altid = { ...req.body, image: base64Image, id: st + 1 };
      const addBook = await book.create(altid);
      const resobj = { id: addBook.id, ...req.body, image: base64Image };
      console.log(resobj);
      res.status(201).json(resobj);
      console.log("next");
    } else {
      const addBook = await book.create(req.body);
      res.status(201).json({ message: addBook });
    }
    // console.log(req.body)
  } catch (error) {
    console.log(req.body);
    res.status(500).json(error.message);
  }
};

exports.getBook = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    const Book = await book.findOne({ id }).select("-_id -__v");
    if (!Book) {
      res.status(404).json({ message: "No such book is available" });
    }
    console.log("Book", Book);
    res.status(200).json(Book);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const findbook = await book.findOneAndDelete({ id });
    if (!findbook) {
      res.status(404).json({ message: "No such book is available" });
    }
    res.status(200).json({
      Messgage: "Book Deleted Successfully",
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.file) {
      req.body.image = `data:${
        req.file.mimetype
      };base64,${req.file.buffer.toString("base64")}`;
    }
    if (typeof req.body.genres === "string") {
      req.body.genres = req.body.genres.split(",").map((item) => item.trim());
    }
    let updatebook = await book
      .findOneAndUpdate({ id }, req.body)
      .select("-_id -__v");
    if (!updatebook) {
      res.status(404).json({ message: "No such book is available" });
    }
    console.log(req.body);
    console.log("Before Effect ", updatebook);
    updatebook = { ...updatebook.toObject(), ...req.body };
    console.log("After Effect ", updatebook);
    // console.log(v)
    res.status(200).json({
      message: "Updated Successfully",
      "Updated Object": updatebook,
    });
  } catch (error) {
    res.status(500).json({ messsage: error.message });
  }
};
exports.updateDocument = (req, res) => {
  try {
    const { id } = req.params;

    res.status(200).json({});
  } catch (error) {
    res.status(500).json({});
  }
};

exports.deleteAll = async (req, res) => {
  try {
    await book.deleteMany({});
    res.status(200).json({ message: "Deleted All" });
  } catch (error) {
    res.status(400).json(error.Messgage);
  }
};

exports.searchbook = async (req, res) => {
  try {
    const { id } = req.params;
    if(!id){
      console.log("no id")
      return res.status(200).json({})
    }
    const books = await book.find({name:{$regex:id,$options:"i"}});
    // const filerBook = books.filter((item) => item.name.startsWith(id));
    if (!books) {
      console.log("No books")
      res.status(404).json({ message: "Book Not Found" });
    }
    return res.status(200).json(books);
  } catch (error) {
    console.log("error message")
    return res.status(500).json(error.message);
  }
};
