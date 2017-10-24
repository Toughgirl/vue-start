/**
 * Created by Jing on 2017/7/17.
 */
export default function nav_active() {
  $("#side-menu li").removeClass("active");
  var $href_nav = (window.location.href).split("/")[4];
  if($href_nav=="index"){
    $("#side-menu li.first-li:eq(1)").addClass("active");

  }
//   客户管理
//    门店管理
  if($href_nav=="_storeList"){
    $("#side-menu li.first-li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level li:eq(0)").addClass("active");
  }
  if($href_nav=="storeNew"){
    $("#side-menu li.first-li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level li:eq(0)").addClass("active");
  }
  if($href_nav=="storeDetail"){
    $("#side-menu li.first-li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level li:eq(0)").addClass("active");
  }
  if($href_nav=="storeEdit"){
    $("#side-menu li.first-li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level li:eq(0)").addClass("active");
  }
//  业务管理
  if($href_nav=="purchaseList"){
    $("#side-menu li.first-li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(1)").find(".nav-third-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(1)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-third-level li:eq(0)").addClass("active");
  }
  if($href_nav=="purchaseDetail"){
    $("#side-menu li.first-li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(1)").find(".nav-third-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(1)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-third-level li:eq(0)").addClass("active");
  }
  if($href_nav=="returnList"){
    $("#side-menu li.first-li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(1)").find(".nav-third-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(1)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-third-level li:eq(1)").addClass("active");
  }
  if($href_nav=="ReturnOrderDetail"){
    $("#side-menu li.first-li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(1)").find(".nav-third-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(1)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-third-level li:eq(1)").addClass("active");
  }
  if($href_nav=="carParts"){
    $("#side-menu li.first-li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level li:eq(1)").find(".nav-third-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level li:eq(1)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-third-level li:eq(2)").addClass("active");
  }
  if($href_nav=="carPartsDetail"){
    $("#side-menu li.first-li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(1)").find(".nav-third-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(1)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-third-level li:eq(2)").addClass("active");
  }
  if($href_nav=="serviceList"){
    $("#side-menu li.first-li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(1)").find(".nav-third-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(1)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-third-level li:eq(3)").addClass("active");
  }
  if($href_nav=="serviceDetail"){
    $("#side-menu li.first-li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(1)").find(".nav-third-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(1)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-third-level li:eq(3)").addClass("active");
  }
//  业务管理-财务管理
  if($href_nav=="SettledList"){
    $("#side-menu li.first-li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").find(".nav-third-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").find(".nav-third-level li:eq(0)").addClass("active");
  }
  if($href_nav=="SettledDetail"){
    $("#side-menu li.first-li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").find(".nav-third-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").find(".nav-third-level li:eq(0)").addClass("active");
  }

  if($href_nav=="SettledList_"){
    $("#side-menu li.first-li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").find(".nav-third-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").find(".nav-third-level li:eq(0)").addClass("active");
  }
  if($href_nav=="SettledDetail_"){
    $("#side-menu li.first-li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").find(".nav-third-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").find(".nav-third-level li:eq(0)").addClass("active");
  }

  if($href_nav=="TransactionList"){
    $("#side-menu li.first-li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").find(".nav-third-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").find(".nav-third-level li:eq(1)").addClass("active");
  }
  if($href_nav=="TransactionDetail"){
    $("#side-menu li.first-li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").find(".nav-third-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").find(".nav-third-level li:eq(1)").addClass("active");
  }
  if($href_nav=="serviceSettleList"){
    $("#side-menu li.first-li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").find(".nav-third-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").find(".nav-third-level li:eq(2)").addClass("active");
  }
  if($href_nav=="serviceSettleDetail"){
    $("#side-menu li.first-li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").find(".nav-third-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").find(".nav-third-level li:eq(2)").addClass("active");
  }

  if($href_nav=="statisticsList"){
    $("#side-menu li.first-li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").find(".nav-third-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").find(".nav-third-level li:eq(3)").addClass("active");
  }
  if($href_nav=="statisticsDetail"){
    $("#side-menu li.first-li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").addClass("active");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").find(".nav-third-level").addClass("in");
    $("#side-menu li.first-li:eq(2)").find(".nav-second-level>li:eq(2)").find(".nav-third-level li:eq(3)").addClass("active");
  }

// 账号中心
  if($href_nav=="account"){
    $("#side-menu li.first-li:eq(3)").addClass("active");
    $("#side-menu li.first-li:eq(3)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(3)").find(".nav-second-level>li:eq(0)").addClass("active");
  }
  if($href_nav=="accountEdit"){
    $("#side-menu li.first-li:eq(3)").addClass("active");
    $("#side-menu li.first-li:eq(3)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(3)").find(".nav-second-level>li:eq(0)").addClass("active");
  }

  if($href_nav=="personal"){
    $("#side-menu li.first-li:eq(3)").addClass("active");
    $("#side-menu li.first-li:eq(3)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(3)").find(".nav-second-level>li:eq(1)").addClass("active");
    $("#side-menu li.first-li:eq(3)").find(".nav-second-level>li:eq(1)").find(".nav-third-level").addClass("in");
    $("#side-menu li.first-li:eq(3)").find(".nav-second-level>li:eq(1)").find(".nav-third-level li:eq(0)").addClass("active");
  }
  if($href_nav=="personalEdit"){
    $("#side-menu li.first-li:eq(3)").addClass("active");
    $("#side-menu li.first-li:eq(3)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(3)").find(".nav-second-level>li:eq(1)").addClass("active");
    $("#side-menu li.first-li:eq(3)").find(".nav-second-level>li:eq(1)").find(".nav-third-level").addClass("in");
    $("#side-menu li.first-li:eq(3)").find(".nav-second-level>li:eq(1)").find(".nav-third-level li:eq(0)").addClass("active");
  }

  if($href_nav=="changePassWord"){
    $("#side-menu li.first-li:eq(3)").addClass("active");
    $("#side-menu li.first-li:eq(3)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(3)").find(".nav-second-level>li:eq(1)").addClass("active");
    $("#side-menu li.first-li:eq(3)").find(".nav-second-level>li:eq(1)").find(".nav-third-level").addClass("in");
    $("#side-menu li.first-li:eq(3)").find(".nav-second-level>li:eq(1)").find(".nav-third-level li:eq(1)").addClass("active");
  }

//   营销管理
  if($href_nav=="marketingList"){
    $("#side-menu li.first-li:eq(4)").addClass("active");
    $("#side-menu li.first-li:eq(4)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(4)").find(".nav-second-level>li:eq(0)").addClass("active");
  }
  if($href_nav=="marketingDetail"){
    $("#side-menu li.first-li:eq(4)").addClass("active");
    $("#side-menu li.first-li:eq(4)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(4)").find(".nav-second-level>li:eq(0)").addClass("active");
  }
  if($href_nav=="marketingStatistics"){
    $("#side-menu li.first-li:eq(4)").addClass("active");
    $("#side-menu li.first-li:eq(4)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(4)").find(".nav-second-level>li:eq(1)").addClass("active");
  }
  if($href_nav=="storeSaleStatistics"){
    $("#side-menu li.first-li:eq(4)").addClass("active");
    $("#side-menu li.first-li:eq(4)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(4)").find(".nav-second-level>li:eq(2)").addClass("active");
  }
  if($href_nav=="signUpStore"){
    $("#side-menu li.first-li:eq(4)").addClass("active");
    $("#side-menu li.first-li:eq(4)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(4)").find(".nav-second-level>li:eq(3)").addClass("active");
  }
  if($href_nav=="achievements"){
    $("#side-menu li.first-li:eq(4)").addClass("active");
    $("#side-menu li.first-li:eq(4)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(4)").find(".nav-second-level>li:eq(4)").addClass("active");
  }

//  财务管理

  if($href_nav=="settlementList"){
    $("#side-menu li.first-li:eq(5)").addClass("active");
    $("#side-menu li.first-li:eq(5)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(5)").find(".nav-second-level>li:eq(0)").addClass("active");
  }
  if($href_nav=="SettlementDetail"){
    $("#side-menu li.first-li:eq(5)").addClass("active");
    $("#side-menu li.first-li:eq(5)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(5)").find(".nav-second-level>li:eq(0)").addClass("active");
  }
  if($href_nav=="selfTranscationList"){
    $("#side-menu li.first-li:eq(5)").addClass("active");
    $("#side-menu li.first-li:eq(5)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(5)").find(".nav-second-level>li:eq(1)").addClass("active");
  }
  if($href_nav=="selftranscationDetail"){
    $("#side-menu li.first-li:eq(5)").addClass("active");
    $("#side-menu li.first-li:eq(5)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(5)").find(".nav-second-level>li:eq(1)").addClass("active");
  }
//消息中心
  if($href_nav=="messageList"){
    $("#side-menu li.first-li:eq(6)").addClass("active");
    $("#side-menu li.first-li:eq(6)").find(".nav-second-level").addClass("in");
    $("#side-menu li.first-li:eq(6)").find(".nav-second-level>li:eq(0)").addClass("active");
  }

}
