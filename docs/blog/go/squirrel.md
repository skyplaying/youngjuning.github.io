---
title: Go 插件每日推荐之 squirrel
cover: https://i.loli.net/2021/04/05/DVfk7H9oC8mbnzN.png
tags: [掘金专栏]
---

> 大家好，我是 [@洛竹](https://github.com/youngjuning)
>
> 本文首发于 [洛竹的官方网站](https://youngjuning.js.org/)
>
> 本文同步于公众号『洛竹早茶馆』，转载请联系作者。
>
> 创作不易，养成习惯，素质三连！

**Squirrel 不是一个 ORM.** 关于 Squirrel 的应用，请查看 [structable，一个表结构映射器](https://github.com/Masterminds/structable)。

Squirrel 帮助你从可组成的部分建立 SQL 查询。

```go
import sq "github.com/Masterminds/squirrel"

users := sq.Select("*").From("users").Join("emails USING (email_id)")

active := users.Where(sq.Eq{"deleted_at": nil})

sql, args, err := active.ToSql()

sql == "SELECT * FROM users JOIN emails USING (email_id) WHERE deleted_at IS NULL"
```

```go
sql, args, err := sq.
    Insert("users").Columns("name", "age").
    Values("moe", 13).Values("larry", sq.Expr("? + 5", 12)).
    ToSql()

sql == "INSERT INTO users (name,age) VALUES (?,?),(?,? + 5)"
```

Squirrel 也可以直接执行查询：

```go
stooges := users.Where(sq.Eq{"username": []string{"moe", "larry", "curly", "shemp"}})
three_stooges := stooges.Limit(3)
rows, err := three_stooges.RunWith(db).Query()

rows, err := db.Query("SELECT * FROM users WHERE username IN (?,?,?,?) LIMIT 3",
                      "moe", "larry", "curly", "shemp")
```

Squirrel 让条件查询的建立变得轻而易举：

```go
if len(q) > 0 {
    users = users.Where("name LIKE ?", fmt.Sprint("%", q, "%"))
}
```

Squirrel 想让你的生活更轻松。

```go
// StmtCache 为你缓存准备好的 Stmts。
dbCache := sq.NewStmtCache(db)

// StatementBuilder 使你的语法保持整洁
mydb := sq.StatementBuilder.RunWith(dbCache)
select_users := mydb.Select("*").From("users")
```

Squirrel loves PostgreSQL:

```go
psql := sq.StatementBuilder.PlaceholderFormat(sq.Dollar)

// 你可以用问号做占位符...
sql, _, _ := psql.Select("*").From("elephants").Where("name IN (?,?)", "Dumbo", "Verna").ToSql()

// squirrel 使用 PlaceholderFormat 替换它们。
sql == "SELECT * FROM elephants WHERE name IN ($1,$2)"


// 你可以取到 id
query := sq.Insert("nodes").
    Columns("uuid", "type", "data").
    Values(node.Uuid, node.Type, node.Data).
    Suffix("RETURNING \"id\"").
    RunWith(m.db).
    PlaceholderFormat(sq.Dollar)

query.QueryRow().Scan(&node.id)
```

你可以通过插入两个问号来逃避问号。

```sql
SELECT * FROM nodes WHERE meta->'format' ??| array[?,?]
```

将与美元占位符一起生成。

```sql
SELECT * FROM nodes WHERE meta->'format' ?| array[$1,$2]
```

## 结语

关注公众号`洛竹早茶馆`，一个持续分享编程知识的地方。

- `点赞`等于学会，`在看`等于精通
- 最后祝大家 2021 学习进步，升职加薪

![](https://youngjuning.js.org/img/luozhu.png)
