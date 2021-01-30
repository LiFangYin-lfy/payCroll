<template>
  <div class="container">
    <div class="paycroll1">
      <div class="img_logo">
        <img src="../../assets/image/logo@2x.png" alt />
      </div>
      <div class="title_name">
        <div class="han_title">五险一金及个税计算器-税后工资倒推</div>
        <div class="Eng_title">
          Personal Income Tax Calculator (after-tax retrodict algorithm)
        </div>
      </div>
    </div>
    <div class="payroll2">
      <div class="itemList">
        <div class="ledt_name">
          <div class="han_name">税前每月工资 (元)</div>
          <div class="Eng_name">Monthly salary before tax</div>
        </div>
        <div class="rig_num">
          <input
            type="number"
            placeholder="请输入"
            v-model="param.salary"
            class="input"
          />
        </div>
      </div>
      <div class="itemList">
        <div class="ledt_name">
          <div class="han_name">工作月份</div>
          <div class="Eng_name">Number of months in employment</div>
        </div>
        <div class="rig_num">
          <input
            type="number"
            placeholder="请输入"
            v-model="param.month"
            class="input"
          />
        </div>
      </div>
      <div class="itemList">
        <div class="ledt_name">
          <div class="han_name">全年年终奖金额 (元)</div>
          <div class="Eng_name">Annual bonus amount</div>
        </div>
        <div class="rig_num">
          <input
            type="number"
            placeholder="请输入"
            class="input"
            v-model="param.annual_bonus"
          />
        </div>
      </div>
      <div class="itemList">
        <div class="ledt_name">
          <div class="han_name">每月6项专项附加及其他项</div>
          <div class="Eng_name">
            6 special add-ons and other items per month
          </div>
        </div>
        <div class="rig_num">
          <input
            type="number"
            placeholder="请输入"
            class="input"
            v-model="param.add_money"
          />
        </div>
      </div>
      <div class="btn_sure" @click="submitList">
        <van-button round size="large" class="blueColor" color="#3886EF"
          >计算 Calculate</van-button
        >
      </div>
      <div class="itemList">
        <div class="ledt_name lft_names">
          <div class="han_name">更多选项</div>
          <div class="Eng_name">More options</div>
        </div>
        <div class="rig_num">
          <!-- <input type="number" placeholder="请输入" class="input" /> -->
        </div>
      </div>
      <div class="itemother">
        <div class="two_item">
          <div class="ledt_name">
            <div class="han_name">社保汇缴基数</div>
            <div class="Eng_name">Social security remittance base</div>
          </div>
          <div class="rig_num">
            <input
              type="number"
              placeholder="请输入"
              class="input"
              v-model="param.social_base"
              :readonly="switchTrue"
            />
          </div>
        </div>
        <div class="down_item">
          <div class="ength">Self-defined base</div>
          <div class="eng_rig" @click="onSwitchTrue">
            <img
              src="../../assets/image/icon_switch1@2x.png"
              alt
              v-if="switchTrue"
            />
            <img src="../../assets/image/icon_switch2@2x.png" v-else alt />
            <span class="customer">自定义</span>
          </div>
        </div>
      </div>
      <div class="itemother">
        <div class="two_item">
          <div class="ledt_name">
            <div class="han_name">公积金汇缴基数</div>
            <div class="Eng_name">Housing funds remittance base</div>
          </div>
          <div class="rig_num">
            <input
              type="number"
              placeholder="请输入"
              class="input"
              v-model="param.housing_fund_base"
              :readonly="switchTap"
            />
          </div>
        </div>
        <div class="down_item">
          <div class="ength">Self-defined base</div>
          <div class="eng_rig" @click="onSwitchTap">
            <img
              src="../../assets/image/icon_switch1@2x.png"
              alt
              v-if="switchTap"
            />
            <img src="../../assets/image/icon_switch2@2x.png" v-else alt />
            <span class="customer">自定义</span>
          </div>
        </div>
      </div>
      <div
        class="itemothemg"
        :class="switchFalse == true ? 'item_is_true' : ''"
      >
        <div class="tog_item">
          <div class="new_name">住房公积金汇缴比例</div>
          <div class="rigt_num">
            <div class="drop" @click="onISshow">
              <span class="ratio"
                >{{
                  param.length != 0
                    ? param.housing_fund_rate
                    : housing_fund_rate
                }}%</span
              >
              <img src="../../assets/image/icon_more@2x.png" alt />
            </div>
            <div
              class="dropdown_content"
              v-if="switchFalse"
              :class="is_Show == true ? 'active' : ''"
            >
              <p
                v-for="(item, index) in housing_fund_rate_option"
                :key="index"
                class="p_c"
                @click.stop="onHousingFundRate(item)"
              >
                {{ item }}
              </p>
            </div>
          </div>
        </div>
        <div class="down_itg">
          <div class="egg">Housing funds remittance percentage</div>
          <div class="egg_rig" @click="changeSwitchFalse">
            <img
              src="../../assets/image/icon_switch2@2x.png"
              v-if="switchFalse"
              alt
            />
            <img src="../../assets/image/icon_switch1@2x.png" alt v-else />
          </div>
        </div>
      </div>
    </div>
    <!-- 方案A -->
    <div class="payroll2 payroll2_1">
      <div class="itemList changeA">
        <div class="ledt_name lft_names">
          <div class="han_name">方案A：年终奖与工资分别算个人所得税</div>
          <div class="Eng_name">
            Plan A: Annual bonus and salary are calculated for personal income
            tax separately
          </div>
        </div>
        <div class="rig_num">
          <!-- <input type="number" placeholder="请输入" class="input" /> -->
        </div>
      </div>
      <div class="itemList">
        <div class="ledt_name">
          <div class="han_name">年终奖应缴个税</div>
          <div class="Eng_name">
            Personal income tax payable applicable to annual bonus
          </div>
        </div>
        <div class="rig_num">
          <input
            type="number"
            placeholder="请输入"
            class="input"
            :value="plan_a.annual_bonus_fee"
            readonly
          />
        </div>
      </div>
      <div class="itemList">
        <div class="ledt_name">
          <div class="han_name">新税法下累计应缴个人所得税</div>
          <div class="Eng_name">
            The accumulated personal income tax payable under the new tax law
          </div>
        </div>
        <div class="rig_num">
          <input
            type="number"
            placeholder="请输入"
            class="input"
            readonly
            :value="plan_a.new_person_fee"
          />
          <!-- <div class="sleep">5000</div> -->
        </div>
      </div>
      <div class="itemList">
        <div class="ledt_name">
          <div class="han_name">新税法下本期应缴个人所得税</div>
          <div class="Eng_name">
            The current-month personal income tax payable under the new tax law
          </div>
        </div>
        <div class="rig_num">
          <input
            type="number"
            placeholder="请输入"
            class="input"
            readonly
            :value="plan_a.new_person_current_fee"
          />
          <!-- <div class="sleep">5000</div> -->
        </div>
      </div>
      <div class="itemList">
        <div class="ledt_name">
          <div class="han_name">老税法下本期应缴个人所得税</div>
          <div class="Eng_name">
            The current month personal income tax payable under the old tax law
          </div>
        </div>
        <div class="rig_num">
          <input
            type="number"
            placeholder="请输入"
            class="input"
            readonly
            :value="plan_a.old_person_current_fee"
          />
        </div>
      </div>
      <div class="itemList">
        <div class="ledt_name">
          <div class="han_name">新税法下个人当月到手工资</div>
          <div class="Eng_name">
            Monthly salaries received under the new tax law
          </div>
        </div>
        <div class="rig_num">
          <input
            type="number"
            placeholder="请输入"
            class="input"
            :value="plan_a.new_current_salary"
            readonly
          />
        </div>
      </div>
      <div class="itemList">
        <div class="ledt_name">
          <div class="han_name">老税法下个人当月到手工资</div>
          <div class="Eng_name">
            Monthly salaries received under the old tax law
          </div>
        </div>
        <div class="rig_num">
          <input
            type="number"
            placeholder="请输入"
            class="input"
            :value="plan_a.old_current_salary"
            readonly
          />
        </div>
      </div>
      <div class="itemList">
        <div class="ledt_name">
          <div class="han_name">新税法下个人平均每月到手工资</div>
          <div class="Eng_name">
            Average monthly salaries received under the new tax law
          </div>
        </div>
        <div class="rig_num">
          <input
            type="number"
            placeholder="请输入"
            class="input"
            :value="plan_a.new_salary_average"
            readonly
          />
        </div>
      </div>
      <div class="itemList">
        <div class="ledt_name">
          <div class="han_name">老税法下个人平均每月到手工资</div>
          <div class="Eng_name">
            Average monthly salaries received under the old tax law
          </div>
        </div>
        <div class="rig_num">
          <input
            type="number"
            placeholder="请输入"
            class="input"
            :value="plan_a.old_salary_average"
            readonly
          />
        </div>
      </div>
      <div class="itemList">
        <div class="ledt_name">
          <div class="han_name">方案A平均每月用人成本</div>
          <div class="Eng_name">
            Average monthly labor cost for company for plan A
          </div>
        </div>
        <div class="rig_num">
          <input
            type="number"
            placeholder="请输入"
            class="input"
            :value="plan_a.cost_new_a"
            readonly
          />
        </div>
      </div>
    </div>
    <!-- 方案B -->
    <div class="payroll2 payroll2_1">
      <div class="itemList changeA">
        <div class="ledt_name lft_names">
          <div class="han_name">
            方案B：年终奖与工资合并计入综合所得算个人所得税
          </div>
          <div class="Eng_name">
            Plan B: Annual bonus and salary are combined into the comprehensive
            income to be calculated for personal income tax
          </div>
        </div>
        <div class="rig_num">
          <!-- <input type="number" placeholder="请输入" class="input" /> -->
        </div>
      </div>
      <div class="itemList">
        <div class="ledt_name">
          <div class="han_name">新税法下工资与年终奖累计应缴个人所得税</div>
          <div class="Eng_name">
            The accumulated personal income tax payable under the new tax law
          </div>
        </div>
        <div class="rig_num">
          <input
            type="number"
            placeholder="请输入"
            class="input"
            :value="plan_b.new_person_fee"
            readonly
          />
        </div>
      </div>
      <!-- <div class="itemList">
        <div class="ledt_name">
          <div class="han_name">老税法下工资与年终奖累计应缴个人所得税</div>
          <div class="Eng_name">
            The current-month personal income tax payable under the new tax law
          </div>
        </div>
        <div class="rig_num">
          <input
            type="number"
            placeholder="请输入"
            class="input"
            readonly
            :value="plan_b.old_person_current_fee"
          />
        </div>
      </div> -->
      <div class="itemList">
        <div class="ledt_name">
          <div class="han_name">新税法下本期应缴个人所得税</div>
          <div class="Eng_name">
            The current-month personal income tax payable under the new tax law
          </div>
        </div>
        <div class="rig_num">
          <input
            type="number"
            placeholder="请输入"
            class="input"
            readonly
            :value="plan_b.new_person_current_fee"
          />
        </div>
      </div>
      <div class="itemList">
        <div class="ledt_name">
          <div class="han_name">老税法下本期应缴个人所得税</div>
          <div class="Eng_name">
            Monthly salaries received under the old tax law
          </div>
        </div>
        <div class="rig_num">
          <input
            type="number"
            placeholder="请输入"
            class="input"
            :value="plan_b.old_person_current_fee"
            readonly
          />
        </div>
      </div>
      <div class="itemList">
        <div class="ledt_name">
          <div class="han_name">新税法下个人当月到手工资</div>
          <div class="Eng_name">
            Monthly salaries received under the new tax law
          </div>
        </div>
        <div class="rig_num">
          <input
            type="number"
            placeholder="请输入"
            class="input"
            :value="plan_b.new_current_salary"
            readonly
          />
        </div>
      </div>
      <div class="itemList">
        <div class="ledt_name">
          <div class="han_name">老税法下个人当月到手工资</div>
          <div class="Eng_name">
            Monthly salaries received under the old tax law
          </div>
        </div>
        <div class="rig_num">
          <input
            type="number"
            placeholder="请输入"
            class="input"
            :value="plan_b.old_current_salary"
            readonly
          />
        </div>
      </div>
      <div class="itemList">
        <div class="ledt_name">
          <div class="han_name">新税法下个人平均每月到手工资</div>
          <div class="Eng_name">
            Average monthly salaries received under the new tax law
          </div>
        </div>
        <div class="rig_num">
          <!-- <div class="sleep">5000</div> -->
          <input
            type="number"
            placeholder="请输入"
            class="input"
            :value="plan_b.new_salary_average"
            readonly
          />
        </div>
      </div>
      <div class="itemList">
        <div class="ledt_name">
          <div class="han_name">老税法下个人平均每月到手工资</div>
          <div class="Eng_name">
            Average monthly salaries received under the old tax law
          </div>
        </div>
        <div class="rig_num">
          <input
            type="number"
            placeholder="请输入"
            class="input"
            :value="plan_b.old_salary_average"
            readonly
          />
        </div>
      </div>
      <div class="itemList">
        <div class="ledt_name">
          <div class="han_name">方案B平均每月用人成本</div>
          <div class="Eng_name">
            Average monthly labor cost for company for plan B
          </div>
        </div>
        <div class="rig_num">
          <input
            type="number"
            placeholder="请输入"
            class="input"
            :value="plan_b.cost_new_b"
            readonly
          />
        </div>
      </div>
    </div>
    <!-- 五险一金汇缴明细 -->
    <div class="payroll2 payroll2_2" style="border-radius: 12px 12px 0 0">
      <div class="itemList changeA">
        <div class="ledt_name lft_names">
          <div class="han_name">五险一金汇缴明细</div>
          <div class="Eng_name">
            Remittance details of Social Securities & Housing funds
          </div>
        </div>
      </div>
      <div class="paycroll">
        <div class="oneitem">
          <div class="one_name">个人应缴部分</div>
          <div class="one_eng">Personal payment</div>
          <div class="one_color">
            <div class="dd_box"></div>
          </div>
        </div>
        <div class="oneitem twoItem">
          <div class="one_name">单位应缴部分</div>
          <div class="one_eng">Company payment</div>
          <div class="one_color two_color">
            <div class="dd_box"></div>
          </div>
        </div>
      </div>
      <div class="neerList">
        <div class="left_blue">
          <div class="neer_name">
            <div class="new_name">基本住房公积金</div>
            <div class="neE_name">Basic housing funds</div>
          </div>
          <div class="countblue">
            <div class="blue_name" v-if="social_user.housing_fund.money != 0">
              {{ social_user.housing_fund.money }}
            </div>
            <div class="blue_name" v-if="social_user.housing_fund.rate != 0">
              ({{ social_user.housing_fund.rate }}%)
            </div>
          </div>
        </div>
        <div class="countFA">
          <div class="FA_name" v-if="social_company.housing_fund.money != 0">
            {{ social_company.housing_fund.money }}
          </div>
          <div class="FA_name" v-if="social_company.housing_fund.rate != 0">
            ({{ social_company.housing_fund.rate }}%)
          </div>
        </div>
      </div>
      <div class="neerList">
        <div class="left_blue">
          <div class="neer_name">
            <div class="new_name">养老保险金</div>
            <div class="neE_name">Pension insurance</div>
          </div>
          <div class="countblue">
            <div class="blue_name" v-if="social_user.endowment.money != 0">
              {{ social_user.endowment.money }}
            </div>
            <div class="blue_name" v-if="social_user.endowment.rate != 0">
              ({{ social_user.endowment.rate }}%)
            </div>
          </div>
        </div>
        <div class="countFA">
          <div class="FA_name" v-if="social_company.endowment.money != 0">
            {{ social_company.endowment.money }}
          </div>
          <div class="FA_name" v-if="social_company.endowment.rate != 0">
            ({{ social_company.endowment.rate }}%)
          </div>
        </div>
      </div>
      <div class="neerList">
        <div class="left_blue">
          <div class="neer_name">
            <div class="new_name">医疗保险金</div>
            <div class="neE_name">medical insurance</div>
          </div>
          <div class="countblue">
            <div class="blue_name" v-if="social_user.medical.money != 0">
              {{ social_user.medical.money }}
            </div>
            <div class="blue_name" v-if="social_user.medical.rate != 0">
              ({{ social_user.medical.rate }}%)
            </div>
          </div>
        </div>
        <div class="countFA">
          <div class="FA_name" v-if="social_company.medical.money != 0">
            {{ social_company.medical.money }}
          </div>
          <div class="FA_name" v-if="social_company.medical.rate != 0">
            ({{ social_company.medical.rate }}%)
          </div>
        </div>
      </div>
      <div class="neerList">
        <div class="left_blue">
          <div class="neer_name">
            <div class="new_name">失业保险金</div>
            <div class="neE_name">Unemployment insurance</div>
          </div>
          <div class="countblue">
            <div class="blue_name" v-if="social_user.unemployment.money != 0">
              {{ social_user.unemployment.money }}
            </div>
            <div class="blue_name" v-if="social_user.unemployment.rate != 0">
              ({{ social_user.unemployment.rate }}%)
            </div>
          </div>
        </div>
        <div class="countFA">
          <div class="FA_name" v-if="social_company.unemployment.money != 0">
            {{ social_company.unemployment.money }}
          </div>
          <div class="FA_name" v-if="social_company.unemployment.rate != 0">
            ({{ social_company.unemployment.rate }}%)
          </div>
        </div>
      </div>
      <div class="neerList">
        <div class="left_blue">
          <div class="neer_name">
            <div class="new_name">生育保险金</div>
            <div class="neE_name">Maternity insurance</div>
          </div>
          <div class="countblue">
            <div class="blue_name" v-if="social_user.birth.money != 0">
              {{ social_user.birth.money }}
            </div>
            <div class="blue_name" v-if="social_user.birth.rate != 0">
              ({{ social_user.birth.rate }}%)
            </div>
          </div>
        </div>
        <div class="countFA">
          <div class="FA_name" v-if="social_company.birth.money != 0">
            {{ social_company.birth.money }}
          </div>
          <div class="FA_name" v-if="social_company.birth.rate != 0">
            ({{ social_company.birth.rate }}%)
          </div>
        </div>
      </div>
      <div class="neerList">
        <div class="left_blue">
          <div class="neer_name">
            <div class="new_name">工伤保险金</div>
            <div class="neE_name">Work injury insurance</div>
          </div>
          <div class="countblue">
            <div class="blue_name" v-if="social_user.industrial.money != 0">
              {{ social_user.industrial.money }}
            </div>
            <div class="blue_name" v-if="social_user.industrial.rate != 0">
              ({{ social_user.industrial.rate }}%)
            </div>
          </div>
        </div>
        <div class="countFA">
          <div class="FA_name" v-if="social_company.industrial.money != 0">
            {{ social_company.industrial.money }}
          </div>
          <div class="FA_name" v-if="social_company.industrial.rate != 0">
            ({{ social_company.industrial.rate }}%)
          </div>
        </div>
      </div>
      <div class="neerList">
        <div class="left_blue">
          <div class="neer_name">
            <div class="new_name">合计</div>
            <div class="neE_name">Total</div>
          </div>
          <div class="countblue">
            <div class="blue_name">{{ social_user_money }}</div>
          </div>
        </div>
        <div class="countFA">
          <div class="FA_name">{{ social_company_money }}</div>
        </div>
      </div>
      <!-- <div class="itemList">
        <div class="ledt_name">
          <div class="han_name">平均月度个人所得税</div>
          <div class="Eng_name">Average monthly personal income tax</div>
        </div>
        <div class="rig_num">
          <div class="sleep">350.00</div>
        </div>
      </div>
      <div class="itemList">
        <div class="ledt_name">
          <div class="han_name">公司平均每月用人成本</div>
          <div class="Eng_name">Average monthly labor cost for company</div>
        </div>
        <div class="rig_num">
          <div class="sleep">350.00</div>
        </div>
      </div> -->
    </div>
    <div class="chinesebox" style="border-radius: 0 0 12px 12px">
      <!--  税前工资去向 (¥5000.00) -->
      <div class="before_direction">税前工资去向 (¥{{ user_go_salary }})</div>
      <div id="main" style="width: 100%; height: 180px; background: #fff"></div>
      <!-- 单位成本去向 (¥6910.00) -->
      <div class="after_direction">单位成本去向 (¥{{ company_go_cost }})</div>
      <div
        id="unitMain"
        style="width: 100%; height: 300px; background: #fff"
      ></div>
      <!--  税前工资去向 (¥5000.00) -->
      <div class="before_direction">
        Before-tax salary chart (¥{{ user_go_salary }})
      </div>
      <div
        id="pieChart"
        style="width: 100%; height: 180px; background: #fff"
      ></div>
      <!-- 单位成本去向 (¥6910.00) -->
      <div class="after_direction">
        Company labor cost chart (¥{{ company_go_cost }})
      </div>
      <div
        id="pieCharteng"
        style="width: 100%; height: 300px; background: #fff"
      ></div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: 'payrollB',
  data() {
    return {
      switchTrue: true,
      switchTap: true,
      switchFalse: true,
      is_Show: false,
      ratio: '7',
      charts: '',
      opinionA: ['个人基本住房公积金', '个人养老保险金', '个人医疗保险金', '个人失业保险金', '个人所得税', '个人税后月薪'],
      opinionB: ['Per. basic housing funds', 'Per. pension insur.', 'Per. medical insur.', 'Per. unemployment insur.', 'Per. income tax', 'After-tax monthly sal.'],
      opinionC: ['企业基本住房公积金', '企业养老保险金', '企业医疗保险金', '企业失业保险金', '企业生育保险金', '企业工伤保险金', '个人基本住房公积金', '个人养老保险金', '个人医疗保险金', '个人失业保险金', '个人所得税', '个人税后月薪'],
      opinionD: ['Co. basic housing funds', 'Co. pension insur.', 'Co. medical insur.', 'Co. unemployment insur.', 'Co. maternity insur.', 'Co. work injury insur.', 'Per. basic housing funds', 'Per. pension insur.', 'Per. medical insur.', 'Per. unemployment insur.', 'Per. income tax', 'After-tax monthly sal.'],
      opinionDataA: [],   // 个人 
      opinionDataB: [],
      opinionDataC: [],  // 单位
      opinionDataD: [],
      company_go_info: '',
      company_go_cost: '',
      plan_a: '',
      plan_b: '',
      social_company: '',
      social_company_money: '',
      social_user: '',
      social_user_money: '',
      user_go_info: '',
      salary: '',
      param: '',
      housing_fund_rate_option: {},
      housing_fund_rate: '',
      housing_fund_bottom: '', //  公积金
      housing_fund_top: '',
      social_bottom: '',  // 社保
      social_top: '',
    }
  },
  created() {
    document.title = "工资计算器-税前工资";
    console.log(1123232321321);
    const result = JSON.parse(this.$route.query.result)
    console.log(result);
    this.opinionDataA = result.user_go.zh
    this.opinionDataB = result.user_go.en
    this.user_go_salary = result.user_go.salary
    this.opinionDataC = result.company_go.zh
    this.opinionDataD = result.company_go.en
    this.company_go_cost = result.company_go.cost
    this.plan_a = result.plan_a
    this.plan_b = result.plan_b
    this.social_company = result.social_company
    this.social_company_money = result.social_company_money
    this.social_user = result.social_user
    this.social_user_money = result.social_user_money
    this.param = result.param
    this.getFundRate()
    this.getBase()
    console.log(this.opinionDataA);

  },
  mounted() {
    console.log(2321323232);

    this.$nextTick(function () {
      this.drawPie(this.opinionDataA)
      this.drawPieZh(this.opinionDataC)
      this.drawPieEn(this.opinionDataB)
      this.drawPieCi(this.opinionDataD)

      // this.drawPie('main', this.opinionDataA, this.opinionA)
      // this.drawPieZh('unitMain', this.opinionDataC, this.opinionC)
      // this.drawPieEn('pieChart', this.opinionDataB, this.opinionB)
      // this.drawPieCi('pieCharteng', this.opinionDataD, this.opinionE)
    })
  },
  methods: {
    changeSwitchFalse() {
      this.switchFalse = !this.switchFalse
    },
    drawPie(id) {  //main
      let that = this
      console.log(id);
      this.charts = this.$echarts.init(document.getElementById('main'))
      this.charts.setOption({
        tooltip: {
          trigger: 'item',
          formatter: "({d}%)",
        },
        legend: {   //图例组件
          type: 'plain',
          orient: 'vertical',  //'vertical'垂直   || 'horizontal'  横向   布局朝向
          x: 'right',
          align: 'left',  //图例标记和文本的对齐
          padding: [    //  图例标记和文本的位置摆放 
            20,  // 上
            30, // 右
            5,  // 下
            10, // 左
          ],
          formatter: function (name) {
            var data = that.opinionDataA;//获取series中的data
            var total = 0;
            var totalPercent_x = 0;
            var index = 0;
            var tarValue;
            var last = 0;
            for (var i = 0, l = data.length; i < l; i++) {
              total += data[i].value;
              if (data[i].name == name) {
                tarValue = data[i].value
              }
            }
            console.log(tarValue, "tarValue");
            for (var i = 0, l = data.length; i < l; i++) {
              // totalPercent += parseInt(((data[i].value / total) * 100).toFixed(2) * 100);
              console.log(((data[i].value / total) * 100).toFixed(2));
              if (data[i].name != '个人税后月薪') {
                console.log(i);
                totalPercent_x += parseFloat((data[i].value / total * 100).toFixed(2));
              } else {
                last = data[i].value;
              }
            }
            console.log('1=' + totalPercent_x);
            var p = ((tarValue / total) * 100).toFixed(2);
            if (last == tarValue) {
              p = (100 - totalPercent_x).toFixed(2);
            }
            console.log(p);
            return name + " " + " " + p + "%";
          },
          itemWidth: 9,  //图例标记宽
          itemHeight: 9, //图例标记高
          borderRadius: 50,
          textStyle: {
            color: '#7D7E80',
            lineHeight: '12',
            fontSize: 12,
          },
          // data: this.opinionA
          data: (function () {
            var res = [];
            var len = id.length;
            for (var i = 0, size = len; i < size; i++) {
              res.push({
                name: id[i].name,
              });
            }
            return res;
          })(),


        },

        color: ['#73a0fa', '#5AD8A6', '#5D7092', '#f7c739', '#E8684A', '#6DC8EC'],   //设置饼状图每个颜色块的颜色
        series: [
          {
            name: '访问来源',
            type: 'pie',   //饼图
            radius: '65%',  //   ['50%', '70%'] 为空心   非数组 '55%'  为实心状态值
            avoidLabelOverlap: false,
            center: ['70', '85', '15', "10"],   //  ['50%', '70%'] 是横纵方向  
            label: {  //饼图图形上的文本标签
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {   // 文字颜色
                  fontSize: '24',
                  fontWeight: 'blod',
                  color: '#ff0000'
                }
              }
            },
            labelLine: {   //标签的视觉引导线样式
              normal: {
                show: false
              }
            },
            // data: this.opinionDataA
            data: (function () {
              var res = [];
              var len = id.length;
              for (var i = 0, size = len; i < size; i++) {
                res.push({
                  name: id[i].name,
                  value: id[i].value
                });
              }
              return res;
            })()
          }
        ]
      })
    },
    drawPieZh(id) {  //unitMain
      let that = this
      this.charts = this.$echarts.init(document.getElementById('unitMain'))
      this.charts.setOption({
        tooltip: {
          trigger: 'item',
          formatter: "({d}%)",
        },
        legend: {   //图例组件
          type: 'plain',
          orient: 'vertical',  //'vertical'垂直   || 'horizontal'  横向   布局朝向
          x: 'right',
          align: 'left',  //图例标记和文本的对齐
          padding: [
            20,  // 上
            30, // 右
            5,  // 下
            10, // 左
          ],
          formatter: function (name) {
            var data = that.opinionDataC;//获取series中的data
            var total = 0;
            var totalPercent_x = 0;
            var index = 0;
            var tarValue;
            var last = 0;
            for (var i = 0, l = data.length; i < l; i++) {
              total += data[i].value;
              if (data[i].name == name) {
                tarValue = data[i].value
              }
            }
            console.log(tarValue, "tarValue");
            for (var i = 0, l = data.length; i < l; i++) {
              // totalPercent += parseInt(((data[i].value / total) * 100).toFixed(2) * 100);
              console.log(((data[i].value / total) * 100).toFixed(2));
              if (data[i].name != '个人税后月薪') {
                console.log(i);
                totalPercent_x += parseFloat((data[i].value / total * 100).toFixed(2));
              } else {
                last = data[i].value;
              }
            }
            console.log('1=' + totalPercent_x);
            var p = ((tarValue / total) * 100).toFixed(2);
            if (last == tarValue) {
              p = (100 - totalPercent_x).toFixed(2);
            }
            console.log(p);
            return name + " " + " " + p + "%";
          },
          itemWidth: 9,  //图例标记宽
          itemHeight: 9, //图例标记高
          borderRadius: 50,
          textStyle: {
            color: '#7D7E80',
            lineHeight: '12',
            fontSize: 12,
          },
          data: (function () {
            var res = [];
            var len = id.length;
            for (var i = 0, size = len; i < size; i++) {
              res.push({
                name: id[i].name,
              });
              // console.log(id[i].name);
            }
            return res;
          })(),
        },

        color: ['#73a0fa', '#5AD8A6', '#5D7092', '#f7c739', '#E8684A', '#6DC8EC', '#9270CA', '#FF9D4D', '#269A99', '#FF99C3', '#5B8FF9', '#BDD2FD'],   //设置饼状图每个颜色块的颜色
        series: [
          {
            name: '访问来源',
            type: 'pie',   //饼图
            radius: '40%',  //   ['50%', '70%'] 为空心   非数组 '55%'  为实心状态值
            avoidLabelOverlap: false,
            center: ['70', '125', '15', "10"],   //  ['50%', '70%'] 是横纵方向  
            label: {  //饼图图形上的文本标签
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {   // 文字颜色
                  fontSize: '24',
                  fontWeight: 'blod',
                  color: '#ff0000'
                }
              }
            },
            labelLine: {   //标签的视觉引导线样式
              normal: {
                show: false
              }
            },
            // data: this.opinionDataC
            data: (function () {
              var res = [];
              var len = id.length;
              for (var i = 0, size = len; i < size; i++) {
                res.push({
                  name: id[i].name,
                  value: id[i].value
                });
              }
              return res;
            })()
          }
        ]
      })
    },
    drawPieEn(id) {   //pieChart
      let that = this
      this.charts = this.$echarts.init(document.getElementById('pieChart'))
      this.charts.setOption({
        tooltip: {
          trigger: 'item',
          formatter: "({d}%)",
        },
        legend: {   //图例组件
          type: 'plain',
          orient: 'vertical',  //'vertical'垂直   || 'horizontal'  横向   布局朝向
          x: 'right',
          align: 'left',  //图例标记和文本的对齐
          padding: [    //  图例标记和文本的位置摆放 
            20,  // 上
            10, // 右
            5,  // 下
            0, // 左
          ],
          formatter: function (name) {
            var data = that.opinionDataB;//获取series中的data
            var total = 0;
            var totalPercent_x = 0;
            var index = 0;
            var tarValue;
            var last = 0;
            for (var i = 0, l = data.length; i < l; i++) {
              total += data[i].value;
              if (data[i].name == name) {
                tarValue = data[i].value
              }
            }
            console.log(tarValue, "tarValue");
            for (var i = 0, l = data.length; i < l; i++) {
              // totalPercent += parseInt(((data[i].value / total) * 100).toFixed(2) * 100);
              console.log(((data[i].value / total) * 100).toFixed(2));
              if (data[i].name != 'After-tax monthly sal.') {
                console.log(i);
                totalPercent_x += parseFloat((data[i].value / total * 100).toFixed(2));
              } else {
                last = data[i].value;
              }
            }
            console.log('1=' + totalPercent_x);
            var p = ((tarValue / total) * 100).toFixed(2);
            if (last == tarValue) {
              p = (100 - totalPercent_x).toFixed(2);
            }
            console.log(p);
            return name + " " + " " + p + "%";
          },

          itemWidth: 9,  //图例标记宽
          itemHeight: 9, //图例标记高
          borderRadius: 50,
          // data: this.opinionB,
          textStyle: {
            color: '#7D7E80',
            lineHeight: '12',
            fontSize: 12,
          }, subtextStyle: {//副标题的属性
            color: 'red',
          },
          data: (function () {
            // console.log(id);
            var res = [];
            var len = id.length;
            for (var i = 0, size = len; i < size; i++) {
              res.push({
                name: id[i].name,
              });
              // console.log(id[i].name);
            }
            return res;
          })(),
        },
        color: ['#73a0fa', '#5AD8A6', '#5D7092', '#f7c739', '#E8684A', '#6DC8EC'],   //设置饼状图每个颜色块的颜色
        series: [
          {
            name: '访问来源',
            type: 'pie',   //饼图
            radius: '48%',  //   ['50%', '70%'] 为空心   非数组 '55%'  为实心状态值
            avoidLabelOverlap: false,
            center: ['50', '70', '15', "10"],   //  ['50%', '70%'] 是横纵方向  
            label: {  //饼图图形上的文本标签
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {   // 文字颜色
                  fontSize: '24',
                  fontWeight: 'blod',
                  color: '#ff0000'
                }
              }
            },
            labelLine: {   //标签的视觉引导线样式
              normal: {
                show: false
              }
            },
            // data: this.opinionDataB
            data: (function () {
              var res = [];
              var len = id.length;
              for (var i = 0, size = len; i < size; i++) {
                res.push({
                  name: id[i].name,
                  value: id[i].value
                });
                // console.log(id[i].value);
              }
              return res;
            })()
          }
        ]
      })
    },
    drawPieCi(id) {  //pieCharteng
      let that = this
      that.charts = that.$echarts.init(document.getElementById('pieCharteng'))
      that.charts.setOption({
        tooltip: {
          trigger: 'item',
          formatter: "({d}%)",
        },
        legend: {   //图例组件
          show: true,
          type: 'plain',
          orient: 'vertical',  //'vertical'垂直   || 'horizontal'  横向   布局朝向
          x: 'right',
          align: 'left',  //图例标记和文本的对齐
          padding: [    //  图例标记和文本的位置摆放 
            20,  // 上
            10, // 右
            5,  // 下
            10, // 左
          ],

          formatter: function (name) {
            var data = that.opinionDataD;//获取series中的data
            var total = 0;
            var totalPercent_x = 0;
            var index = 0;
            var tarValue;
            var last = 0;
            for (var i = 0, l = data.length; i < l; i++) {
              total += data[i].value;
              if (data[i].name == name) {
                tarValue = data[i].value
              }
            }
            console.log(tarValue, "tarValue");
            for (var i = 0, l = data.length; i < l; i++) {
              // totalPercent += parseInt(((data[i].value / total) * 100).toFixed(2) * 100);
              console.log(((data[i].value / total) * 100).toFixed(2));
              if (data[i].name != 'After-tax monthly sal.') {
                console.log(i);
                totalPercent_x += parseFloat((data[i].value / total * 100).toFixed(2));
              } else {
                last = data[i].value;
              }
            }
            console.log('1=' + totalPercent_x);
            var p = ((tarValue / total) * 100).toFixed(2);
            if (last == tarValue) {
              p = (100 - totalPercent_x).toFixed(2);
            }
            console.log(p);
            return name + " " + " " + p + "%";
          },


          itemWidth: 9,  //图例标记宽
          itemHeight: 9, //图例标记高
          borderRadius: 50,
          textStyle: {
            color: '#7D7E80',
            lineHeight: '12',
            fontSize: 12,
          },
          data: (function () {
            var res = [];
            var len = id.length;
            for (var i = 0, size = len; i < size; i++) {
              res.push({
                name: id[i].name,
              });
              // console.log(id[i].name);
            }
            return res;
          })(),
        },
        color: ['#73a0fa', '#5AD8A6', '#5D7092', '#f7c739', '#E8684A', '#6DC8EC', '#9270CA', '#FF9D4D', '#269A99', '#FF99C3', '#5B8FF9', '#BDD2FD'],   //设置饼状图每个颜色块的颜色
        series: [
          {
            name: that.opinionD,
            type: 'pie',   //饼图
            radius: '30%',  //   ['50%', '70%'] 为空心   非数组 '55%'  为实心状态值
            avoidLabelOverlap: false,
            center: ['50', '100', '15', "10"],   //  ['50%', '70%'] 是横纵方向  
            label: {  //饼图图形上的文本标签
              normal: {
                show: false,
                position: 'right'
              },
              emphasis: {
                show: true,
                textStyle: {   // 文字颜色
                  fontSize: '24',
                  fontWeight: 'blod',
                  color: '#ff0000'
                }
              }
            },
            labelLine: {   //标签的视觉引导线样式
              normal: {
                show: false
              }
            },
            // data: that.opinionDataD
            data: (function () {
              var res = [];
              var len = id.length;
              for (var i = 0, size = len; i < size; i++) {
                res.push({
                  name: id[i].name,
                  value: id[i].value
                });
                // console.log(id[i].value);
              }
              return res;
            })()
          }
        ]
      })
    },
    async getResult() {
      try {
        const { data } = await this.$http.post(
          "api/before_to_after/index", this.submit
        );
        // console.log(data);
        if (data.code == 1) {
          this.$router.push('/payrollB')
        } else {
          Toast.fail(data.msg)
        }
      } catch (err) {
        console.log(err);
      }
    },
    async submitList() {
      let that = this
      let obj = that.param
      let art = Number(obj.salary)
      let housing_fund_bottom = Number(that.housing_fund_bottom)
      let housing_fund_top = Number(that.housing_fund_top)
      let social_top = Number(that.social_top)
      let social_bottom = Number(that.social_bottom)
      if (art == '') {
        Toast.fail('请输入税前每月工资')
      } else if (obj.month == '') {
        Toast.fail('请输入工作月份')
      } else {
        if (that.switchTrue) {
          if (art < social_bottom) {
            obj.social_base = social_bottom
          } else if (art > social_top) {
            obj.social_base = social_top
          } else {
            obj.social_base = art
          }
        } else {
          // console.log(obj);
        }
        if (that.switchTap) {
          if (art < housing_fund_bottom) {
            obj.housing_fund_base = housing_fund_bottom
          } else if (art > housing_fund_top) {
            obj.housing_fund_base = housing_fund_top
          } else {
            obj.housing_fund_base = art
          }
        } else {
          // console.log(obj);
        }
        try {
          const { data } = await that.$http.post(
            "api/before_to_after/index", obj
          );
          // console.log(data);
          if (data.code == 1) {
            this.opinionDataA = data.data.user_go.zh
            this.opinionDataB = data.data.user_go.en
            this.user_go_salary = data.data.user_go.salary
            this.opinionDataC = data.data.company_go.zh
            this.opinionDataD = data.data.company_go.en
            this.company_go_cost = data.data.company_go.cost
            this.plan_a = data.data.plan_a
            this.plan_b = data.data.plan_b
            this.social_company = data.data.social_company
            this.social_company_money = data.data.social_company_money
            this.social_user = data.data.social_user
            this.social_user_money = data.data.social_user_money
            this.param = data.data.param
            this.drawPie(data.data.user_go.zh)
            this.drawPieZh(data.data.company_go.zh)
            this.drawPieEn(data.data.user_go.en)
            this.drawPieCi(data.data.company_go.en)

          } else {
            // Toast.fail(data.msg)
            // console.log(data);
          }
        } catch (err) {
          console.log(err);
          // console.log(err.data.msg);
          // Toast.fail(err.data.msg)
        }
      }
    },
    async getFundRate() {
      try {
        const { data } = await this.$http.post(
          "api/before_to_after/getHousingFundRate"
        );
        // console.log(data);
        if (data.code == 1) {
          this.housing_fund_rate = data.data.housing_fund_rate
          this.housing_fund_rate_option = data.data.housing_fund_rate_option

        } else {
          Toast.fail(data.msg)
        }
      } catch (err) {
        // console.log(err);
        Toast.fail(err.data.msg)
      }
    },
    onSwitchTrue() {
      this.switchTrue = !this.switchTrue
      // console.log(this.switchTrue);
    },
    onSwitchTap() {
      this.switchTap = !this.switchTap
      console.log(this.switchTap);
    },
    async getBase() {
      try {
        const { data: { data } } = await this.$http.post(
          "api/before_to_after/getBase"
        );
        console.log(data);
        this.social_top = data.social_top
        this.social_bottom = data.social_bottom
        this.housing_fund_bottom = data.housing_fund_bottom
        this.housing_fund_top = data.housing_fund_top
      } catch (err) {
        console.log(err);
        // Toast.fail(err.data.msg)
      }
    },
    onHousingFundRate(item) {
      this.param.housing_fund_rate = item
      this.is_Show = !this.is_Show
    },
    onISshow() {
      this.is_Show = !this.is_Show
    },
  }
}
</script>

<style scoped lang='less'>
.container {
  width: 100%;
  min-height: 100%;
  background-color: #f7f8fa;
  padding: 0 16px 50px;
  box-sizing: border-box;
  .paycroll1 {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 16px 0;
    box-sizing: border-box;
    .img_logo {
      width: 33px;
      height: 36px;
      img {
        width: 100%;
      }
    }
    .title_name {
      flex: 1;
      padding-left: 10px;
      box-sizing: border-box;
      text-align: left;

      .han_title {
        width: 100%;
        font-size: 16px;
        color: #26292c;
      }
      .Eng_title {
        font-size: 11px;
        color: #7d7e80;
      }
    }
  }
  .payroll2 {
    width: 100%;
    padding: 6px 16px 15px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 12px;
    .itemList {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 0;
      box-sizing: border-box;
      border-bottom: 1px solid #eeeeee;
      .ledt_name {
        flex: 3;
        text-align: left;
        .han_name {
          font-size: 13px;
          color: #323233;
          line-height: 24px;
          font-weight: 600;
        }
        .Eng_name {
          font-size: 10px;
          color: #969799;
        }
      }
      .lft_names {
        position: relative;
        &::after {
          content: "";
          position: absolute;
          left: -10px;
          top: 0px;
          width: 3px;
          height: 100%;
          background-color: #3886ef;
          border-radius: 4px;
        }
      }
      .rig_num {
        flex: 1;
        .sleep {
          width: 100%;
          text-align: right;
          color: #323233;
          font-size: 14px;
        }
        .input {
          width: 100%;
          text-align: right;
          color: #323233;
          font-size: 14px;
        }
      }
    }
    .changeA {
      width: 100%;
      .lft_names {
        flex: 1;
      }
      .rig_num {
        flex: 0;
      }
    }
    .paycroll {
      width: 100%;
      display: flex;
      align-items: center;
      padding: 10px 0;
      box-sizing: border-box;
      background-color: #f7f8fa;
      .oneitem {
        text-align: right;
        flex: 7;
        .one_name {
          font-size: 11px;
          color: #323233;
          line-height: 15px;
          font-weight: 600;
        }
        .one_eng {
          font-size: 9px;
          line-height: 18px;
          color: #969799;
        }
        .one_color {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 5px 0;
          box-sizing: border-box;
          .dd_box {
            width: 6px;
            height: 6px;
            background: #1989fa;
          }
        }
        .two_color {
          width: 100%;
          text-align: right;
          .dd_box {
            width: 6px;
            height: 6px;
            background: #fa6419;
          }
        }
      }
      .twoItem {
        flex: 5;
        padding-right: 3px;
        box-sizing: border-box;
      }
    }
    .neerList {
      padding: 10px 0;
      box-sizing: border-box;
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #eeeeee;
      .left_blue {
        flex: 7;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .neer_name {
          .new_name {
            font-size: 14px;
            font-family: PingFangSC, PingFangSC-Medium;
            font-weight: 600;
            text-align: left;
            color: #323233;
            line-height: 18px;
          }
          .neE_name {
            font-size: 11px;
            font-family: SFProText, SFProText-Regular;
            font-weight: 400;
            text-align: left;
            color: #969799;
            line-height: 13px;
          }
        }
        .countblue {
          .blue_name {
            color: #1989fa;
            font-size: 14px;
            line-height: 18px;
            text-align: right;
          }
        }
      }
      .countFA {
        flex: 4;
        text-align: right;
        .FA_name {
          font-size: 14px;
          line-height: 18px;
          color: #fa6419;
        }
      }
    }
    .itemother {
      width: 100%;
      padding: 12px 0;
      box-sizing: border-box;
      border-bottom: 1px solid #eeeeee;
      .two_item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .ledt_name {
          flex: 4;
          text-align: left;
          .han_name {
            font-size: 14px;
            line-height: 24px;
            color: #323233;
            font-weight: 600;
          }
          .Eng_name {
            font-size: 11px;
            color: #969799;
          }
        }
        .rig_num {
          flex: 2;
          .input {
            width: 100%;
            text-align: right;
          }
        }
      }
      .down_item {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 6px;
        box-sizing: border-box;
        .ength {
          flex: 4;
          font-size: 11px;
          color: #969799;
        }
        .eng_rig {
          flex: 2;
          display: flex;
          align-items: center;
          justify-content: flex-end;
          .customer {
            font-size: 12px;
            color: #7d7e80;
            margin-left: 5px;
          }
          img {
            width: 27px;
            height: 16px;
          }
        }
      }
    }
    .itemothemg {
      width: 100%;
      padding: 12px 0;
      box-sizing: border-box;
      .tog_item,
      .down_itg {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .new_name {
          flex: 4;
          font-size: 14px;
          color: #c8c9cc;
          line-height: 24px;
          font-weight: 600;
        }
        .rigt_num {
          flex: 2;
          position: relative;

          .drop {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: flex-end;
            .ratio {
              font-size: 14px;
              color: #c8c9cc;
            }
            img {
              width: 18px;
              height: 18px;
              margin-left: 3px;
            }
          }
          .dropdown_content {
            width: 60px;
            display: none;
            position: absolute;
            top: 20px;
            right: 0;
            background-color: #f9f9f9;
            box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
            padding: 12px 16px;
            z-index: 1;
            text-align: center;
            .p_c {
              font-size: 14px;
              color: #323233;
              padding: 10px 0;
              box-sizing: border-box;
              border-bottom: 1px solid #f2f2f2;

              &:last-child {
                border: none;
              }
            }
          }
          .active {
            display: block;
          }
        }
      }
      .down_itg {
        width: 100%;
        .egg {
          flex: 1;
          font-size: 11px;
          color: #c8c9cc;
        }
        .egg_rig {
          width: 27px;
          height: 16px;
          img {
            width: 100%;
          }
        }
      }
    }
    .item_is_true {
      .tog_item {
        .new_name {
          color: #323233;
        }
        .rigt_num {
          .ratio {
            font-size: 14px;
            color: #323233;
          }
        }
      }
    }
  }
  .payroll2_1,
  .payroll2_2 {
    margin-top: 20px;
    .itemList:last-child {
      border: none;
    }
  }
  .btn_sure {
    width: 100%;
    padding: 10px 0;
    box-sizing: border-box;
    text-align: center;
    border-bottom: 1px solid #eeeeee;
    .blueColor {
      width: 60%;
      border-radius: 8px;
      height: 40px;
    }
  }
  .chinesebox {
    width: 100%;
    padding: 16px 0px;
    box-sizing: border-box;
    background-color: #fff;
    border-radius: 12px;
    .before_direction,
    .after_direction {
      width: 100%;
      font-size: 14px;
      color: #323233;
      font-weight: 600;
      margin: 20px 0;
      position: relative;
      padding: 0 16px;
      box-sizing: border-box;
      &::after {
        content: "";
        position: absolute;
        left: -16px;
        top: 0px;
        width: 3px;
        height: 100%;
        background-color: #3886ef;
        border-radius: 4px;
      }
    }
    .beforebcake {
      width: 100%;
      display: flex;
      align-items: center;
      .left_cake {
        flex: 3;
        padding: 20px;
        box-sizing: border-box;
        .cakeitem {
          width: 100%;
          background-color: #61a0a8;
        }
      }
      .right_cake {
        flex: 2;
        padding: 20px;
        box-sizing: border-box;
        .rightcakeitem {
          width: 100%;
          background-color: #73deb3;
        }
      }
    }
  }
}
</style>