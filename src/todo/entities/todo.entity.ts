import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: "todos" })
export class Todo {

   @PrimaryGeneratedColumn()
   id: number;

   @Column()
   title: string;

   @Column()
   date: string;

   @Column()
   completed: boolean;

   // Many todos can belong to single user
   @ManyToOne(() => User, (user) => user.todos, {
      onDelete: "CASCADE"
   })
   @JoinColumn({ name: 'user_id' })
   user: User;

}
