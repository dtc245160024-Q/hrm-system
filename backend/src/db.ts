import { DataSource } from "typeorm";
import dotenv from "dotenv";
import { Role } from "./entities/Role";
import { User } from "./entities/User";
import { Employee } from "./entities/Employee";
import { Department } from "./entities/Department";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true, // Tự động đồng bộ bảng
    logging: false,
    entities: [Role, User, Employee, Department],
});

export const connectDB = async () => {
    try {
        await AppDataSource.initialize();
        console.log("✅ Kết nối TypeORM & PostgreSQL thành công! Schema Department đã được đồng bộ.");
    } catch (error) {
        console.error("❌ Lỗi kết nối TypeORM:", error);
    }
};
