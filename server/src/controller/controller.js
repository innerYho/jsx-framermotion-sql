const msg = require("../messages/messages")
exports.search = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err);
        conn.query(
            // "SELECT * FROM tbl_water",
            "SELECT * FROM tbl_water ORDER BY wtr_id DESC LIMIT 1",


            (err, result) => {
                console.log(
                    result.length == 0
                        ? "Err ctrl.search" + err
                        : "ctrl.search " + result.length + " rows"
                )

                res.json(
                    result.length == 0
                        ? { err: msg.searchErr }
                        : { rows: result, msg: msg.searchOk }
                );
            }

        )
    })
}

exports.create = (req, res) => {
    req.getConnection((err, conn) => {
        if (err) return res.send(err)
        conn.query("INSERT INTO tbl_water set ?", [req.body],
            (err, result) => {
                console.log(err ? "Err ctrl.create"
                    : "create Ok!")
                res.json(
                    // !err ? { message: "ingreso exítoso", msg: msg.createOk, result } : { error: `Sucedio un error al guardar los datos: ${err}` }
                    !err ? { msg: msg.createOk, message: "ingreso exítoso" } : { err: msg.createErr }

                );
            }
        )
    }
    )
}