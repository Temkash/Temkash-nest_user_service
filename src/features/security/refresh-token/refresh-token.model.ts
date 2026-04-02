import { BaseEntity } from "common/base.model";
import { User } from "src/features/user/user.model";
import { Column, Entity, ManyToOne } from "typeorm";

@Entity()
export class RefreshToken extends BaseEntity {
    
    @ManyToOne(() => User)
    user: User;

    @Column()
    tokenHash: string;

    @Column()
    expiresAt: Date;

    @Column()
    sessionId: string;
}