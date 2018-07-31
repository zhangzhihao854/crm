<template>
  <!--v-show="show"-->
  <div class="calendar-input-container"

  :class="[isRed ? 'red-theme' : 'blue-theme']"
  :style="containerStyle">

    <label for="calendar-input">

      <!--<input ref="mainInput" class="calendar-input" type="text" readonly="readonly"
      :class="{focus: isfocus}"

      v-model="selectValue">-->


      <div id="calendar-header"  class="calendar-input">
        <span class="arrow" @click="subMonth"><img src="../../../../static/images/left@3x.png" height="25" width="25"></span>
          <span id="date-box"  @click="focus">
            {{trueSelectYear}}年{{trueSelectMonth}}月{{trueSelectDay}}日
          </span>
        <span class="arrow" @click="addMonth"><img src="../../../../static/images/right@3x.png" height="25" width="25" alt=""></span>
      </div>
    </label>

    <transition name="fade">

      <div id="calendar" v-show="changeShowCalendar">

        <div class="week">
          <span v-for="(item, index) in week" :class="{weekend: index === 0 || index === 6}">
            {{item}}
          </span>
        </div>
        <div class="days">
          <span v-for="(item, index) in renderData"
          :class="{
            weekend: index % 7 === 0 || index % 7 === 6,
            unselect: unselectArr.includes(index),
            select: index === firstDayInWeek + trueSelectDay - 1
          }"
          @click="changeSelectDay(index)">
            {{item}}
            <!--<div style="margin-top: -17px;font-size: 12px;color:white;">十一</div>-->
          </span>

        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'calendar-input',
    props: {
      show: {   //是否显示组件
        type: Boolean,
        default: true
      },
      isRed: {  //红蓝两种主题可选
        type: Boolean,
        default: false
      },
      limit: {  //日期可选范围
        type: Object,
        default() {
          return {
            minYear: 1900,
            minMonth: 1,
            minDay: 1,
            maxYear: 2030,
            maxMonth: 3,
            maxDay: 20
          }
        }
      },
      showCalendar: {  //是否显示日历
        type: Boolean,
        default: true
      },
      containerStyle: { //组件容器样式
        type: Object
      }
    },
    data () {
      return {
        isfocus: true,
        changeShowCalendar: this.showCalendar,
        week: ["日", "一", "二", "三", "四", "五", "六"],
        date: new Date(),
        selectYear: new Date().getFullYear(),
        selectMonth: new Date().getMonth() + 1,
        selectDay: new Date().getDate()
      }
    },
    activated(){
      this.changeShowCalendar=false;
//      console.log("activited----->");
    },
    methods: {
      focus() {
        this.isfocus = !this.isfocus;
        this.changeShowCalendar = !this.changeShowCalendar;
      },
      subMonth() {
        if (this.selectMonth === 1) {
          this.selectMonth = 12;
          this.selectYear -= 1;
        } else {
          this.selectMonth -= 1
        }
        if (this.selectYear < this.limit.minYear) this.selectYear = this.limit.minYear;
        if (this.selectYear === this.limit.minYear) {
          if (this.selectMonth <= this.limit.minMonth) {
            this.selectMonth = this.limit.minMonth;
          }
        }
      },
      addMonth() {
        if (this.selectMonth === 12) {
          this.selectMonth = 1;
          this.selectYear += 1;
        } else {
          this.selectMonth += 1
        }

        if (this.selectYear > this.limit.maxYear) this.selectYear = this.limit.maxYear;
        if (this.selectYear === this.limit.maxYear) {
          if (this.selectMonth >= this.limit.maxMonth) {
            this.selectMonth = this.limit.maxMonth;
          }
        }
      },

      addDay() {
        if (this.selectDay === 31) {
          this.selectDay = 1;
          this.selectMonth += 1;
        } else {
          this.selectDay += 1
        }
        if (this.selectMonth === 12) {
          this.selectMonth = 1;
          this.selectYear += 1;
        }

      },


      subDay() {
        if (this.selectDay === 1) {
          this.selectDay = 31;
          this.selectMonth -= 1;
        } else {
          this.selectDay -= 1
        }
        if (this.selectMonth === 1) {
          this.selectMonth = 12;
          this.selectYear -= 1;
        }
      },


      changeSelectDay(index) {
        this.isfocus = !this.isfocus;
        this.changeShowCalendar = !this.changeShowCalendar;
        if (this.unselectArr.includes(index)) return false;
        this.selectDay = index - this.firstDayInWeek + 1;
      }
    },
    computed: {
      trueSelectYear: function () {
        if (this.selectYear < this.limit.minYear) return this.limit.minYear;
        if (this.selectYear > this.limit.maxYear) return this.limit.maxYear;
        return this.selectYear;
      },
      trueSelectMonth: function () {
        if (this.selectYear === this.limit.minYear && this.selectMonth < this.limit.minMonth) return this.limit.minMonth;
        if (this.selectYear === this.limit.maxYear && this.selectMonth > this.limit.maxMonth) return this.limit.maxMonth;
        return this.selectMonth;
      },
      trueSelectDay: function () {
        if (this.selectYear === this.limit.minYear && this.selectMonth === this.limit.minMonth && this.selectDay < this.limit.minDay) return this.limit.minDay;
        if (this.selectYear === this.limit.maxYear && this.selectMonth === this.limit.maxMonth && this.selectDay > this.limit.maxDay) return this.limit.maxDay;
        if (this.selectDay > this.dayCount) return this.dayCount;
        return this.selectDay;
      },
      selectValue: function () {
        return `${this.trueSelectYear}-${this.trueSelectMonth}-${this.trueSelectDay}`;
      },
      firstDayInWeek: function () {
        return new Date(this.trueSelectYear, this.trueSelectMonth - 1, 1).getDay();
      },
      dayCount: function () {
        return new Date(this.trueSelectYear, this.trueSelectMonth, 0).getDate();
      },
      lastMonthDay: function () {
        let lastNum  = this.firstDayInWeek;
        let lastDays = [];
        if (lastNum === 0) return lastDays;

        let i = 0;
        let lastDayNum = new Date(this.trueSelectYear, this.trueSelectMonth - 1, 0).getDate();
        for (; i < lastNum; i++) {
          lastDays.unshift(lastDayNum);
          lastDayNum--;
        }
        return lastDays;
      },
      nextMonthDay: function () {
        let num      = 42 - this.firstDayInWeek - this.dayCount;
        let nextDays = [];
        if (num === 0) return nextDays;

        let i   = 1;
        for (; i <= num; i++) {
          nextDays.push(i);
        }
        return nextDays;
      },
      renderData: function () {
        let nowDays = [];
        let i = 1;
        for (; i <= this.dayCount; i++) {
          nowDays.push(i);
        }
        return [...this.lastMonthDay, ...nowDays, ...this.nextMonthDay];
      },
      unselectArr: function () {

        let index = 0;
        let arr   = [];

        if (this.trueSelectYear === this.limit.minYear && this.trueSelectMonth === this.limit.minMonth) {
          for (; index < this.firstDayInWeek + this.limit.minDay - 1; index++) {
            arr.push(index);
          }
        } else {
          for (; index < this.firstDayInWeek; index++) {
            arr.push(index)
          }
        }

        if (this.trueSelectYear === this.limit.maxYear && this.trueSelectMonth === this.limit.maxMonth) {
          index = this.firstDayInWeek + this.limit.maxDay;
          for (; index < 42; index++) {
            arr.push(index);
          }
        } else {
          index = this.firstDayInWeek + this.dayCount;
          for (; index < 42; index++) {
            arr.push(index);
          }
        }

        return arr;
      }
    },
    watch: {
      selectValue: function (newVal) {
        //修改日期格式 xx-xx-xx
        var year = newVal.split("-")[0];
        var day = newVal.split("-")[2];
        var month = newVal.split("-")[1];
        // console.log(month);
        if(month.length===1)
        {
          if(day.length ===1){
            newVal = year+"-0"+month+"-0"+day;
          }else{
            newVal = year+"-0"+month+"-"+day;
          }
        }

        this.$emit('getValue', newVal);

      }
    },
    mounted() {
      //修改日期格式 xx-xx-xx
      var year = this.selectValue.split("-")[0];
      var day = this.selectValue.split("-")[2];
      var month = this.selectValue.split("-")[1];
      var resultDate = "";
      // console.log(month);
      if(month.length===1)
      {
        if( day.length ===1){
          resultDate = year+"-0"+month+"-0"+day;
        }else{
          resultDate = year+"-0"+month+"-"+day;
        }
      }
      else {
        resultDate = this.selectValue;
      }
      this.$emit('getValue', resultDate);
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
/*@import "calendar.css";*/
.calendar-input-container{
  padding:0px;
}
.arrow img{
  vertical-align:middle;
}
#date-box{
  margin-left:20%;
  margin-right:20%;
}
</style>
