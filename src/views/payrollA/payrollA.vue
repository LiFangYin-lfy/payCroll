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
          <div class="han_name">税后平均每月工资 (元)</div>
          <div class="Eng_name">Average monthly salary after tax</div>
        </div>
        <div class="rig_num">
          <input
            type="number"
            placeholder="请输入"
            class="input"
            v-model="submit.salary_hand_average"
            @blur="salaryHandAverage"
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
            v-model="submit.add_money"
          />
        </div>
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
              v-model="submit.social_base"
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
              :readonly="switchTap"
              v-model="submit.housing_fund_base"
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
              <span class="ratio">{{ submit.housing_fund_rate }}%</span>
              <img src="../../assets/image/icon_more@2x.png" alt />
            </div>
            <div
              class="dropdown_content"
              :class="is_Show == true ? 'active' : ''"
              v-if="switchFalse"
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
    <div class="btn_sure" @click="submitList">
      <van-button round size="large" color="#3886EF" class="Calculate"
        >计算 Calculate</van-button
      >
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant';
export default {
  name: 'payrollA',
  data() {
    return {
      switchTrue: true,
      switchTap: true,
      switchFalse: true,
      is_Show: false,
      submit: {
        salary_hand_average: '',
        add_money: '',
        social_base: '',
        housing_fund_base: '',
        housing_fund_rate: '',
      },
      housing_fund_rate_option: {},
      housing_fund_bottom: '', //  公积金
      housing_fund_top: '',
      social_bottom: '',  // 社保
      social_top: '',
    }
  },
  created() {
    document.title = "工资计算器-税后工资";
    this.getFundRate()
    this.getBase()
  },
  mounted() {
  },
  methods: {
    async submitList() {
      let that = this
      console.log(this.submit);
      let obj = this.submit
      if (obj.salary_hand_average == '') {
        Toast.fail('请输入税后每月工资')
      } else {
        try {
          const { data } = await this.$http.post(
            "api/after_to_before/index", this.submit
          );
          console.log(data);
          if (data.code == 1) {
            let result = data.data
            that.$router.push({ path: '/payrollC', query: { result: JSON.stringify(result) } });
          } else {
            Toast.fail(data.msg)
          }
        } catch (err) {
          console.log(err);
          Toast.fail(err.data.msg)
        }
      }
    },
    changeSwitchFalse() {
      this.switchFalse = !this.switchFalse
    },
    async getFundRate() {
      try {
        const { data } = await this.$http.post(
          "api/before_to_after/getHousingFundRate"
        );
        console.log(data);
        if (data.code == 1) {
          this.submit.housing_fund_rate = data.data.housing_fund_rate
          this.housing_fund_rate_option = data.data.housing_fund_rate_option

        } else {
          Toast.fail(data.msg)
        }
      } catch (err) {
        console.log(err);
        Toast.fail(err.data.msg)
      }
    },
    async getBase() {
      try {
        const { data: { data } } = await this.$http.post(
          "api/after_to_before/getBase"
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
    onSwitchTrue() {
      this.switchTrue = !this.switchTrue
    },
    onSwitchTap() {
      this.switchTap = !this.switchTap
    },
    onHousingFundRate(item) {
      this.submit.housing_fund_rate = item
      this.is_Show = !this.is_Show
    },
    salaryHandAverage() {
      console.log(this.submit.salary_hand_average);
      let art = Number(this.submit.salary_hand_average)
      let housing_fund_bottom = Number(this.housing_fund_bottom)
      let housing_fund_top = Number(this.housing_fund_top)
      let social_top = Number(this.social_top)
      let social_bottom = Number(this.social_bottom)
      if (this.switchTrue == true) {
        if (art < social_bottom) {
          this.submit.social_base = social_bottom
        } else if (art > social_top) {
          this.submit.social_base = social_top
        } else {
          this.submit.social_base = art
        }
      }
      if (this.switchTap == true) {
        if (art < housing_fund_bottom) {
          this.submit.housing_fund_base = housing_fund_bottom
        } else if (art > housing_fund_top) {
          this.submit.housing_fund_base = housing_fund_top
        } else {
          this.submit.housing_fund_base = art
        }
      }
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
  padding: 0 16px;
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
        font-weight: 600;
      }
      .Eng_title {
        font-size: 11px;
        color: #7d7e80;
      }
    }
  }
  .payroll2 {
    width: 100%;
    padding: 15px 10px;
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
        flex: 4;
        text-align: left;
        .han_name {
          font-size: 14px;
          color: #323233;
          line-height: 24px;
          font-weight: 600;
        }
        .Eng_name {
          font-size: 11px;
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
        flex: 2;
        .input {
          width: 100%;
          text-align: right;
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
        padding-top: 10px;
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
            bottom: 25px;
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

  .btn_sure {
    width: 100%;
    position: fixed;
    bottom: 0;
    left: 0;
    text-align: center;
    z-index: 10;
    padding: 5px 0;
    box-sizing: border-box;
    background-color: #fff;
    .Calculate {
      width: 88%;
      border-radius: 8px;
    }
  }
}
</style>