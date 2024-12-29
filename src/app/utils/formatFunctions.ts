export function formatPhoneNumber(phone: string): string {

    const phoneArr = phone.split('');

    const oneArr = [phoneArr[0], phoneArr[1], phoneArr[2]];
    const twoArr = [' ', '(', phoneArr[3], phoneArr[4], phoneArr[5], ')', ' '];
    const treeAr = [phoneArr[6], phoneArr[7], phoneArr[8], '-'];
    const fourArr = [phoneArr[9], phoneArr[10], '-'];
    const fiveArr = [phoneArr[11], phoneArr[12]];

    const newPhoneArr: string[] = [];

    oneArr.map(item => newPhoneArr.push(item));
    twoArr.map(item => newPhoneArr.push(item));
    treeAr.map(item => newPhoneArr.push(item));
    fourArr.map(item => newPhoneArr.push(item));
    fiveArr.map(item => newPhoneArr.push(item));
   
    const newPhone = newPhoneArr.join('')

   
    return newPhone;
}

export function dataFormat (data: string): string {
    const dataSplit = data.split('');
    const newDataArray = [dataSplit[8], dataSplit[9], ".", dataSplit[5], dataSplit[6], ".", dataSplit[0], dataSplit[1], dataSplit[2], dataSplit[3] ]
    return newDataArray.join('')
   
}

 