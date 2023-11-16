import express from "express";
import ffmpeg from "fluent-ffmpeg";

const app = express();
app.use(express.json());

app.post("/process-video", (req, res) => {
    const inputVideoPath = req.body.inputFilePath;
    const outputVideoPath = req.body.outputFilePath;

    if (!inputVideoPath || !outputVideoPath){
        res.status(400).send("Bad request: Missing file path");
    }

    ffmpeg(inputVideoPath)
     .outputOptions("-vf", "scale=-1:360")
     .on("end", () => {
        res.status(200).send("Processing Finished Successfully.")
     })
     .on("error", (err) => {
        console.log(`An error occured ${err.message}`);
        res.status(500).send(`Internal Error Occurred: ${err.message}`);
     })
     .save(outputVideoPath);
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Video processing service listening at localhost:${port}`);
})