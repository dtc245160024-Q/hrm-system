import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique: true })
    username: string;

    @Column({ type: "varchar" })
    passwordHash: string;

    @Column({ type: "int" })
    roleId: number;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;
}
