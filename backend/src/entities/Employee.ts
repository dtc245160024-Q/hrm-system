import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity('employees')
export class Employee {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar" })
    fullName: string;

    @Column({ type: "varchar", unique: true })
    email: string;

    @Column({ type: "varchar", nullable: true })
    phone: string;

    @Column({ type: "int", nullable: true })
    departmentId: number;

    @Column({ type: "int", nullable: true })
    userId: number;

    @CreateDateColumn({ type: "timestamp" })
    createdAt: Date;
}
