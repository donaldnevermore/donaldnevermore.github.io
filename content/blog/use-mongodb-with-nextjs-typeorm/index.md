---
title: 在 Nest.js 中使用 MongoDB 与 TypeORM
date: "2019-09-28T20:54:03.284Z"
description: ""
---

首先要在 database 文件夹里建立 DatabaseModule 模块文件，

```typescript
// database/database.module.ts
import { Module } from "@nestjs/common";
import { databaseProviders } from "./database.providers";

@Module({
    providers: [...databaseProviders],
    exports: [...databaseProviders]
})
export class DatabaseModule {}
```

还有 databaseProviders，要注意根据情况配置好端口、数据库名等等信息，

```typescript
// database/database.providers.ts
import { createConnection } from "typeorm";

export const databaseProviders = [
    {
        // Token可以自己设定
        provide: "DbConnectionToken",
        useFactory: async () =>
            await createConnection({
                type: "mongodb",
                host: "localhost",
                port: 27017,
                database: "test",
                entities: [__dirname + "/../**/*.entity{.ts,.js}"]
            })
    }
];
```

然后在一个需要用到 MongoDB 的模块里导入 DatabaseModule，我这里用的是 LoginModule，

```typescript
// login/login.module.ts
import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { loginProviders } from "./login.providers";
import { LoginService } from "./login.service";
import { LoginController } from "./login.controller";

@Module({
    imports: [DatabaseModule], // 这里导入进来
    controllers: [LoginController],
    providers: [...loginProviders, LoginService]
})
export class LoginModule {}
```

定义好你的数据实体，

```typescript
// login/login.entity.ts
import { Entity, Column, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class User {
    @ObjectIdColumn() id: ObjectID;
    @Column() username: string;
    @Column() password: string;
}
```

在loginProviders里注入，

```typescript
// login/login.providers.ts
import { Connection, getMongoRepository } from "typeorm";
import { User } from "./login.entity";

export const loginProviders = [
    {
        // Token可以自己设定
        provide: "LoginRepositoryToken",
        // User是entity定义的数据实体
        useFactory: (connection: Connection) => connection.getMongoRepository(User),
        inject: ["DbConnectionToken"]
    }
];
```

在 LoginService 里面引入，

```typescript
import { Injectable, Inject } from "@nestjs/common";
import { MongoRepository } from "typeorm";
import { User } from "./login.entity";

@Injectable()
export class LoginService {
    constructor(
        // Token要对应
        @Inject("LoginRepositoryToken")
        private readonly loginRepository: MongoRepository<User>
    ) {
    }

    // 数据库的操作交给service来提供
    async findAll(): Promise<User[]> {
        return await this.loginRepository.find();
    }
}
```

最后就可以在 LoginController 里面使用了！
