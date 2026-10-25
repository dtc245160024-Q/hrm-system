import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('departments')
export class Department {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique: true })
    name: string;

    @Column({ type: "text", nullable: true })
    description: string;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;
}
