$(()=>{
	var txtName=document.getElementById("txtName");
	var txtPwd=document.getElementById("txtPwd");
	document.getElementById("btnLogin").onclick=()=>{
		$.post(
			"data/routes/users/login.php",
			$("#login").serialize()
		).then(text=>{
			if(text=="false")
				alert("用户名或密码错误!");
			else{
				//如果有search
				if(location.search!==""){
					location=decodeURIComponent(
						location.search.slice(6)
					);
				}else
					location="index.html";
			}
		})
	};
});