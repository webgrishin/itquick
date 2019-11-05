export { default as accounts } from './Acct';
export { default as operDays } from './OpDate';

import acctBalances from './AcctPos';
import transactions from './OpEntry';


function addId(item, i){
	item.id = i+1;
}

acctBalances.forEach(addId);

transactions.forEach(addId);


export {acctBalances, transactions};

//ffmpeg -y -i disp3.mp4 -b 100K -vf fps=4,scale=1024:-1 t1.gif

