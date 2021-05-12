import HTTPCLIENT from 'axios';

export default class Service {
  // đây là chuẩn chung.
  post(params = {}, url = '') {
    return new Promise((resolve, rejects) => {
      const param = {params: params};
      HTTPCLIENT.post(url, param, {})
        .then((response) => {
          // kết quả trả về
          console.log(`API: ${url} - Params: ${JSON.stringify(params)}`);
          if (!!response && response.status == 200) {
            // việc kết nối Server thành công
            //         resolve(response) // giá trị sẽ được trả về .then();

            ///////////////////////// đây là code của công ty kiểm tra thêm việc data trả về có đúng hay không  /////////////////////
            if (response.data.result == undefined) {
              resolve(response);
            } else {
              resolve(response.data.result);
            }
          } else {
            rejects(response); // giá trị sẽ được trả về ở .catch();
          }
        })
        .catch((exception) => {
          rejects(exception);
        });
    });
  }
}
