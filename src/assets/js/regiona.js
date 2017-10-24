/*****
 * jsp 引用
 * <%@ include file="/_config/system_tag.jsp"%>
 *
 * <script type="text/javascript">
 *		var $CURL = '${curl}';
 *		var $uploadServing = '${upload_serving}';
 *		var $uploadMethod = '${upload_method}';
 *		var $uploadCallBack = '${upload_callback}';
 *	</script>
 *
 * ******/
/********jsp 样式*****************/
//<select class=" regiona-lasss"   id="regionaOne"  style="height: 30px; width: 140px;"  date-level-no="1" onchange="alert(1)">
//    <option value="">请选择省</option>
//</select>
//<select class=" regiona-lasss"  id="regionaTwo" style="height: 30px; width: 140px;" date-level-no="2" onchange="getDictRegionaList(3,this.options[this.options.selectedIndex].value,null)">
//    <option value="">请选择市</option>
//</select>
//<select class="regiona-lasss"  id="regionaThree" style="height: 30px; width: 140px;" date-level-no="3" onchange="getDictRegionaList(4,this.options[this.options.selectedIndex].value,null)">
//    <option value="">请选择区/县</option>
//</select>

$(function(){
	//加载第一级区域信息
	getDictRegionaList(1,null,null);

});

/**************获取区域******************/
function getDictRegionaList(levelNo,regionaPid,keyWords){

	//清除后面的级数的选项值
	$(".regiona-lasss").each(function(i){
		if(parseInt($(this).attr("date-level-no"))>=parseInt(levelNo))
		{
			$(this).children(":eq(0)").nextAll().remove();
		}
	});

	if(parseInt(levelNo)>=2 && (regionaPid==null || regionaPid==""))
	{
		return false;
	}

	var html='<option data-level-no="'+parseInt(levelNo)+'" value="">请选择</option>';
	//请求数据
	$.ajax({
		type : "POST",
		url : "http://192.168.0.163:9011/jingycf-manage/system/dictRegiona/getDictRegionaList",
		data : {
			levelNo:levelNo,
			regionaPid:regionaPid,
			keyWords:keyWords
		},
		async : false,
		success : function(data) {
			if(!(typeof(data) == "undefined" || data==null || data==""))
			{
				//转化json
				var list = eval("("+data+")");
				if (list.length>0) {

					//拼接区域html
					for(var i=0;i<list.length;i++)
					{
						html += '<option data-level-no="'+parseInt(levelNo)+'" value="'+list[i].id+'">'+list[i].title+'</option>';
					}


				}
			}

		}
	});
	$(".regiona-lasss").each(function(i){
		if(parseInt($(this).attr("date-level-no"))==levelNo)
		{
			//写入区域选项信息
			$(this).html(html);
		}
	});
}

//获取当前选中的区域id
function getChoseRegiona(){
	var  a_x='';
	$(".regiona-lasss").each(function(i){
		var _regionId = $(this).val();
		if(!(typeof(_regionId) == "undefined" || _regionId==null || _regionId==""))
		{
			a_x = _regionId;
		}
	});
	return a_x;
}


//设置省级默认选项
function setRegionaOneDefault()
{
	//默认设置为四川省
	$("#regionaOne").val("510000");
}
//设置省级默认选项，并禁用选择
function setRegionaOneDefDis()
{
	//默认设置为四川省
	$("#regionaOne").val("510000");
	//获取四川省二级区域
	getDictRegionaList(2,"510000",null);
	//禁用选择
	$("#regionaOne").attr("disabled","disabled");
}

