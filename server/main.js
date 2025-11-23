import express from "express";
import fs from "fs";
import path from "path";
import cors from 'cors'

const app = express();
app.use(express.json());
app.use(cors())

// data.json manzili
const filePath = path.join(process.cwd(), 'data', "data.json");

// Agar fayl mavjud bo‘lmasa → yaratamiz
if (!fs.existsSync(filePath)) {
    fs.writeFileSync(
        filePath,
        JSON.stringify({ tasks: [] }, null, 2)
    );
}

// JSON o‘qish
function readData() {
    const file = fs.readFileSync(filePath, "utf8");
    return JSON.parse(file);
}

// JSON yozish
function writeData(data) {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

// 🔵 READ ALL
app.get("/task", (req, res) => {
    const data = readData();
    res.json(data);
});

// 🟢 CREATE
app.post("/task", (req, res) => {
    const { title, desc } = req.body;
    if (!title || !desc) {
        return res.status(400).json({ message: "title va desc kerak" });
    }

    const data = readData();
    const newPost = {
        id: Date.now(),
        title,
        desc,
    };

    data.push(newPost);
    writeData(data);

    res.json({ message: "Qo'shildi", post: newPost });
});

// 🟡 UPDATE
app.put("/task/:id", (req, res) => {
    const { id } = req.params;
    const { title, desc } = req.body;

    const data = readData();
    const index = data.findIndex((p) => p.id == id);

    if (index === -1) return res.status(404).json({ message: "Topilmadi" });

    data[index] = {
        ...data[index],
        title: title || data[index].title,
        desc: desc || data[index].desc,
    };

    writeData(data);

    res.json({ message: "Yangilandi", post: data[index] });
});

// 🔴 DELETE
app.delete("/task/:id", (req, res) => {
    const { id } = req.params;

    let data = readData();
    const exist = data.some((p) => p.id == id);

    if (!exist) return res.status(404).json({ message: "Topilmadi" });

    data = data.filter((p) => p.id != id);
    writeData(data);

    res.json({ message: "O\'chirildi" });
});

const PORT = 3600
app.listen(PORT, () => console.log("Server is running PORT:", PORT));
