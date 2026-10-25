import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: "varchar", unique: true })
    name: string;

    @Column({ type: "text", nullable: true })
    description: string;
}
