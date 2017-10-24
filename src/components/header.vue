<template>
  <nav class="navbar-default navbar-static-side" role="navigation">
    <div class="sidebar-collapse">
      <ul class="nav" id="side-menu">
        <li class="nav-header first-li">
          <div class="dropdown profile-element">
            <h2 class="font-bold">运营商系统</h2>
          </div>
          <div class="logo-element">
            运营商
          </div>
        </li>
        <li class="first-li active">
          <a href="#/index"><i class="fa fa-home"></i> <span class="nav-label">首页</span></a>
        </li>
        <li class="first-li">
          <a href="javascript:;"><i class="fa fa-users"></i> <span class="nav-label">客户管理</span><span class="fa arrow"></span></a>
          <ul class="nav nav-second-level">
            <li>
              <a href="#/_storeList">门店管理</a>
            </li>
            <li>
              <a href="#/purchaseList">业务管理<span class="fa arrow"></span></a>
              <ul class="nav nav-third-level">
                <li><a href="#/purchaseList">采购业务</a></li>
                <li><a href="#/returnList">退货业务</a></li>
                <li><a href="#/carParts">全车件</a></li>
                <li><a href="#/serviceList">服务单</a></li>
              </ul>
            </li>
            <li>
              <a href="#/SettledList">财务管理<span class="fa arrow"></span></a>
              <ul class="nav nav-third-level">
                <li><a href="#/SettledList_">采购结算单</a></li>
                <li><a href="#/TransactionList">交易明细</a></li>
                <li><a href="#/serviceSettleList">服务单明细</a></li>
                <li><a href="#/statisticsList">门店应付款统计</a></li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="first-li">
          <a href="javascript:;"><i class="fa fa-user"></i> <span class="nav-label">账户中心</span> <span class="fa arrow"></span></a>
          <ul class="nav nav-second-level">
            <li>
              <a href="#/account">公司信息</a>
            </li>
            <li>
              <a href="#/personal">个人中心<span class="fa arrow"></span></a>
              <ul class="nav nav-third-level">
                <li><a href="#/personal">个人中心</a></li>
                <li><a href="#/changePassWord">修改密码</a></li>
              </ul>
            </li>
          </ul>
        </li>
        <li class="first-li">
          <a href="javascript:;"><i class="fa fa-tags" aria-hidden="true"></i><span class="nav-label">营销管理</span> <span class="fa arrow"></span></a>
          <ul class="nav nav-second-level">
            <li>
              <a href="#/marketingList">购销活动</a>
            </li>
            <li>
              <a href="#/marketingStatistics">购销数据统计</a>
            </li>
            <li>
              <a href="#/storeSaleStatistics">门店销量统计</a>
            </li>
            <li>
              <a href="#/signUpStore">签约门店统计</a>
            </li>
            <li>
              <a href="#/achievements">绩效统计</a>
            </li>
          </ul>
        </li>
        <li class="first-li">
          <a href="javascript:;"><i class="fa fa-calculator" aria-hidden="true"></i><span class="nav-label">财务管理</span> <span class="fa arrow"></span></a>
          <ul class="nav nav-second-level">
            <li>
              <a href="#/settlementList">已结算</a>
            </li>
            <!--<li>-->
            <!--<a href="#/selfTranscationList">交易明细</a>-->
            <!--</li>-->
          </ul>
        </li>
        <li class="first-li">
          <a href="javascript:;"><i class="fa fa-envelope-o"></i> <span class="nav-label">消息中心</span> <span class="fa arrow"></span></a>
          <ul class="nav nav-second-level">
            <li><a href="#/messageList">消息管理</a></li>
          </ul>
        </li>
      </ul>
    </div>
  </nav>
</template>

