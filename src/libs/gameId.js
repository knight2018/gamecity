export const searchGame = function(gameId){
   switch(gameId){
       case 30000:
       return '百人牛牛';
       case 30001:
       return '明牌抢庄';
       case 30002:
       return '快乐30秒';
       case 30003:
       return '斗地主';
       case 30004:
       return '水浒传';
       case 30005:
       return '连环夺宝';
       case 30006:
       return '深海捕鱼';
       case 30007:
       return '名车汇';
       default :
       return '';
   }
}