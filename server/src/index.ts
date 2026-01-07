import app from "./app";
import connectDB from "./config/db";

connectDB()
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server is live at port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connnected", error);
  });
