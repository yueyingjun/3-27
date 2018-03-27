var light=require("ueklight");
var router=light.Router();
var mysql=require("mysql");

var path=require("path");

var connent=mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"123456",
    database:"w1710"
})

var crypto=require("crypto");


router.get("/",function(req,res){
    console.log(req.cookies.login)
    if(req.cookies.login) {
        connent.query("select * from info where uid="+req.cookies.uid,function (err,result) {
            res.render("index.html", {result: result,uname:req.cookies.uname});
        })
    }else{
        res.redirect("/login");
    }



})

router.get("/login",function (req,res) {
    res.render("login.html")
})

router.post("/checkLogin",function (req,res) {
    var md5=crypto.createHash("md5")
    var uname=req.body.uname;
    var pass=md5.update(req.body.pass);
    pass=md5.digest("hex")

    connent.query(`select * from user where uname='${uname}' and upass='${pass}'`,function (err,result) {
        if(result.length>0){
            res.cookie("login","yes");
            res.cookie("uname",uname);
            res.cookie("uid",result[0].uid.toString());
            res.redirect("/")
        }else{
            res.redirect("/login")
        }
    })
})


router.get("/logout",function (req,res) {
    res.clearCookie();
    res.redirect("/login");
})

/*删除*/
router.get("/del/:id",function (req,res) {

    var id=req.params.id;
    connent.query("delete from info where id="+id,function (err,result) {
        if(result.affectedRows>0){
            res.redirect("/")
        }
    })
})

/* 编辑
*
* */
router.get("/edit/:id",function (req,res) {

    var id=req.params.id;
    connent.query("select * from info where id="+id,function (err,result) {
        console.log(result);
        res.render("edit.html",{result:result[0]})
    })

})

/*修改内容*/
router.post("/editCon",function (req,res) {
    var id=(req.body.id);
    var name=(req.body.uname);
    var age=(req.body.age);
    var sex=(req.body.sex);

    connent.query(`update info set name='${name}',age='${age}',sex='${sex}' where id=${id}`,function (err,result) {

        if(result.affectedRows>0){
            res.redirect("/")
        }
    })


})