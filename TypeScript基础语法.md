# TypeScript
## typescript在JavaScript的基础上加入了静态类型检查功能，因此每一个变量都有固定的数据类型[变量声明]
```typescript
  let msg:string ="hello word"
  /**
   * let:声明变量的关键字
   * msg:变量名,自定义
   * string:变量的数据类型
   */
  //string:字符串，可以用单引号或者双引号
  let msg:string ="hello word"
  //number:数值，整数，浮点数都可以
  let age:number =21
  // boolean:布尔
  let finished:boolean = true
  // any:不确定类型，可以是任意类型
  let a:any = 'jack'
  a = 21
  //union:联合类型，可以是多个指定类型中的一种
  let u:string|number|boolean = "rose"
  u = 18
  //object:对象
  let p = {name:'jack',age:21}
  console.log(p.name)
  console.log(p['name'])
  //Array:数组，元素可以是任意类型
  let names:Array<string> = ['Jack','Rose']
  let ages:number[] = [21,18]
  console.log(names[0])

```

## typescript与大多数开发语言类似，支持基于if-else和switch的条件控制[条件控制]
```typescript
/* if-else */
let num:number = 21
//判断是否是偶数
if(num % 2 === 0){
  console.log(num + '是偶数')
}else{
  console.log(num + '是奇数')
}

//判断是否是正数
if(num > 0){
  console.log(num+'是正数')
}else if(num < 0){
  console.log(num+'是负数')
}else{
  console.log(num+'为0')
}
/* 
  ps:在typescript中，空字符串，数字0，null,undefind都被认为false,其他值则为true
  if(num){
    //num非空，可以执行逻辑
  }  
*/

/* switch */
let grade:string = 'A'
switch(grade){
  case 'A':{
    console.log('优秀')
    break
  }
  case 'B':{
    console.log('合格')
    break
  }
  case'c':{
    console.log('不合格')
    break
  }
  default:{
    console.log('非法输入')
    break
  }
}
```

## typescript支持for和while循环，并且为一些内置类型如Array等提供了快捷迭代语法[循环迭代]
```typescript
/* 迭代器 */
//普通for
for(let i = 1;i<=10;i++){
  console.log('点赞'+ i + '次')
}

//while
let i = 1;
while(i<=10){
  console.log('点赞'+i + '次')
}

/* for迭代器 */
//定义数组
let names:string[] = ['Jack','Rose']

// for in 迭代器，遍历得到数组角标
for(const i in names) {
  console.log(i+':'+names[i])
}

//for of 迭代器，直接得到元素
for(const name of names) {
  console.log(name)
}
```

## typescript通常利用function关键字声明函数，并且支持可选参数，默认参数，箭头函数等特殊语法[函数]
```typescript
/* 定义函数 */

  //无返回值函数，返回void可以省略
  function sayHello(name:string):void{
    console.log('你好,'+name+'!')
  }
  sayHello('jack')

  //有返回值
  function sum(X:number,y:number):number{
    return X+y
  }
  let result = sum(21,18)
  console.log('21+18 =' + result)

  //箭头函数
  let sayHi = (name:string)=>{
    console.log('你好'+name+'!')
  }
  sayHi('Rose')
/*  */
```