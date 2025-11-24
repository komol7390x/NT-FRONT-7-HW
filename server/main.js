import express from "express";
import fs from "fs";
import path from "path";
import cors from 'cors'


const app = express();
app.use(express.json());

app.use(
    cors({
        exposedHeaders: ["X-Total-Count"]
    })
);

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
const setTime = 1000
// 🔵 READ ALL
app.get("/users", (req, res) => {
    setTimeout(() => {
        let data = readData();

        const search = req.query.name_like?.toLowerCase();
        if (search) {
            data = data.filter(user =>
                user.name.toLowerCase().includes(search)
            );
        }

        const page = Number(req.query._page) || 1;
        const limit = Number(req.query._limit) || data.length;
        const start = (page - 1) * limit;
        const end = start + limit;

        const paginated = data.slice(start, end);

        res.setHeader("X-Total-Count", data.length);

        res.json(paginated);
    }, setTime);
});


// 🔵 READ one
app.get("/users/:id", (req, res) => {
    setTimeout(() => {
        const { id } = req.params;
        let data = readData();
        const exist = data.find((item) => item.id == Number(id));

        if (!exist) return res.status(404).json({ message: "Topilmadi" });

        return res.json(exist);
    }, setTime);
});

// 🟢 CREATE
app.post("/users", (req, res) => {
    setTimeout(() => {
        const { name, username, email } = req.body;
        if (!name || !username || !email) {
            return res.status(400).json({ message: "username,email va name kerak" });
        }

        const data = readData();
        const newPost = {
            id: Date.now(),
            name,
            username,
            email
        };

        data.push(newPost);
        writeData(data);

        res.json({ message: "Qo'shildi", post: newPost });
    }, setTime);

});

// 🟡 UPDATE
app.patch("/users/:id", (req, res) => {
    setTimeout(() => {
        const { id } = req.params;
        const { name, username, email } = req.body;

        const data = readData();
        const index = data.findIndex((item) => item.id == id);

        if (index === -1) return res.status(404).json({ message: "Topilmadi" });

        data[index] = {
            ...data[index],
            name: name || data[index].name,
            username: username || data[index].username,
            email: email || data[index].email
        };

        writeData(data);

        res.json({ message: "Yangilandi", post: data[index] });
    }, setTime);
});

// 🔴 DELETE
app.delete("/users/:id", (req, res) => {
    setTimeout(() => {
        const { id } = req.params;
        let data = readData();
        const exist = data.some((item) => item.id == id);

        if (!exist) return res.status(404).json({ message: "Topilmadi" });

        data = data.filter((item) => item.id != id);
        writeData(data);

        res.json({ message: "O'chirildi", data: {} });
    }, setTime);
});


const PORT = 3600
app.listen(PORT, () => console.log("Server is running PORT:", PORT));
console.log(`http://localhost:${PORT}`)
