import dbConnect from "../../../db/dbConnect";
import jwt from "jsonwebtoken";

export const config = {
    api: {
      bodyParser: false,
    },
}
  
export default async function handler(req, res) {
  await dbConnect();
  
  if (req.method === 'GET') {
    const { cookie } = req.query;

    try {
      jwt.verify(cookie, process.env.JWT_PASS);
      res.status(200).json({ status: 'valid' });
    } catch (err) {
      res.status(404).json({ status: err.message });
    }
  } else {
    res.status(404).json({ status: 'Error not GET' });
  }
}
