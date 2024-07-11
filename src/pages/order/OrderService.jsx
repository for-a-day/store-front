import axios from 'axios';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

export const getOrderList = async (storeNo) => {
  console.log(storeNo);
  try {
    const userData = sessionStorage.getItem('user');

    const token = JSON.parse(userData).token;

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`http://localhost:9001/order?storeNo=${1}`, config);
    if (response.status !== 200) {
      alert('서버 응답 오류');
      return 'error';
    }
    const orderList = response.data.data.orderList;
    if (orderList) {
      orderList.sort((a, b) => {
        return a.tableNumber - b.tableNumber;
      });
      console.log('주문 목록 : ', orderList);
    }
    return orderList;
  } catch (error) {
    if (error.response) {
      // 서버가 응답을 반환했을 때
      console.error(`Error Status: ${error.response.status}`);
      console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
      if (error.response.status === 403 || error.response.status === 401) {
        alert('권한이 없습니다.');
      } else {
        alert('주문 리스트 가져오기에 실패하였습니다.');
      }
    } else if (error.request) {
      // 요청이 서버에 도달하지 못했을 때
      console.error('No response received from server');
      alert('서버에 연결할 수 없습니다.');
    } else {
      // 요청을 설정하는 중에 오류가 발생했을 때
      console.error(`Error Message: ${error.message}`);
      alert('알 수 없는 오류가 발생하였습니다.');
    }
  }
};

export const getTableList = async (storeNo) => {
  try {
    const userData = sessionStorage.getItem('user');

    const token = JSON.parse(userData).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`http://localhost:9001/table?storeNo=${storeNo}`, config);

    if (response.status !== 200) {
      alert('서버 응답 오류');
      return 'error';
    }

    const tableList = response.data.data.tableList;
    if (tableList) {
      tableList.sort((a, b) => {
        return a.tableNumber - b.tableNumber;
      });
    }
    return tableList;
  } catch (error) {
    if (error.response) {
      // 서버가 응답을 반환했을 때
      console.error(`Error Status: ${error.response.status}`);
      console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
      if (error.response.status === 403 || error.response.status === 401) {
        alert('권한이 없습니다.');
      } else {
        alert('테이블 목록 가져오기에 실패하였습니다.');
      }
    } else if (error.request) {
      // 요청이 서버에 도달하지 못했을 때
      console.error('No response received from server');
      alert('서버에 연결할 수 없습니다.');
    } else {
      // 요청을 설정하는 중에 오류가 발생했을 때
      console.error(`Error Message: ${error.message}`);
      alert('알 수 없는 오류가 발생하였습니다.');
    }
  }
};

export const getPaymentList = async (storeNo) => {
  try {
    const userData = sessionStorage.getItem('user');

    const token = JSON.parse(userData).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(`http://localhost:9001/payment?storeNo=${storeNo}`, config);

    if (response.status !== 200) {
      alert('서버 응답 오류');
      return 'error';
    }

    const paymentList = response.data.data.paymentList;
    if (paymentList) {
      paymentList.sort((a, b) => {
        return a.updatedDate - b.updatedDate;
      });
    }
    return paymentList;
  } catch (error) {
    if (error.response) {
      // 서버가 응답을 반환했을 때
      console.error(`Error Status: ${error.response.status}`);
      console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
      if (error.response.status === 403 || error.response.status === 401) {
        alert('권한이 없습니다.');
      } else {
        alert('주문 목록 조회에 실패하였습니다.');
      }
    } else if (error.request) {
      // 요청이 서버에 도달하지 못했을 때
      console.error('No response received from server');
      alert('서버에 연결할 수 없습니다.');
    } else {
      // 요청을 설정하는 중에 오류가 발생했을 때
      console.error(`Error Message: ${error.message}`);
      alert('알 수 없는 오류가 발생하였습니다.');
    }
  }
};

export const deletePayment = async (orderNo) => {
  try {
    const userData = sessionStorage.getItem('user');

    const token = JSON.parse(userData).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.delete(`http://localhost:9001/payment?orderNo=${orderNo}`, config);
    if (response.status !== 200) {
      alert('서버 응답 오류');
      return 'error';
    }
    return response.data;
  } catch (error) {
    if (error.response) {
      // 서버가 응답을 반환했을 때
      console.error(`Error Status: ${error.response.status}`);
      console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
      if (error.response.status === 403 || error.response.status === 401) {
        alert('권한이 없습니다.');
      } else {
        alert('주문 삭제에 실패하였습니다.');
      }
    } else if (error.request) {
      // 요청이 서버에 도달하지 못했을 때
      console.error('No response received from server');
      alert('서버에 연결할 수 없습니다.');
    } else {
      // 요청을 설정하는 중에 오류가 발생했을 때
      console.error(`Error Message: ${error.message}`);
      alert('알 수 없는 오류가 발생하였습니다.');
    }
  }
};

export const getOrderDetail = async (tableNo) => {
  try {
    const userData = sessionStorage.getItem('user');

    const token = JSON.parse(userData).token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get(
      `http://localhost:9001/table/order?tableNo=${tableNo}`,
      config,
    );

    if (response.status !== 200) {
      alert('서버 응답 오류');
      return 'error';
    }

    return response.data.data.tableOrderDetail;
  } catch (error) {
    if (error.response) {
      // 서버가 응답을 반환했을 때
      console.error(`Error Status: ${error.response.status}`);
      console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
      if (error.response.status === 403 || error.response.status === 401) {
        alert('권한이 없습니다.');
      } else {
        // alert('주문 상세보기에 실패하였습니다.');
      }
    } else if (error.request) {
      // 요청이 서버에 도달하지 못했을 때
      console.error('No response received from server');
      alert('서버에 연결할 수 없습니다.');
    } else {
      // 요청을 설정하는 중에 오류가 발생했을 때
      console.error(`Error Message: ${error.message}`);
      alert('알 수 없는 오류가 발생하였습니다.');
    }
  }
};

export const orderComplete = async (tableNo) => {
  const userData = sessionStorage.getItem('user');
  const token = JSON.parse(userData).token;

  try {
    const response = await fetch('http://localhost:9001/table/clear', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        tableNo: tableNo,
      }),
    });

    if (response.status !== 200) {
      alert('서버 응답 오류');
      return 'error';
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    if (error.response) {
      // 서버가 응답을 반환했을 때
      console.error(`Error Status: ${error.response.status}`);
      console.error(`Error Data: ${JSON.stringify(error.response.data)}`);
      if (error.response.status === 403 || error.response.status === 401) {
        alert('권한이 없습니다.');
      } else {
        alert('주문 완료 처리에 실패하였습니다.');
      }
    } else if (error.request) {
      // 요청이 서버에 도달하지 못했을 때
      console.error('No response received from server');
      alert('서버에 연결할 수 없습니다.');
    } else {
      // 요청을 설정하는 중에 오류가 발생했을 때
      console.error(`Error Message: ${error.message}`);
      alert('알 수 없는 오류가 발생하였습니다.');
    }
    return 'error';
  }
};

export const orderSocket = () => {
  const socket = new SockJS('http://localhost:9001/ws');
  const stompClient = Stomp.over(socket);
  const userData = sessionStorage.getItem('user');
  const storeNo = JSON.parse(userData).storeNo;

  stompClient.connect({}, () => {
    const topic = `/topic/orders/${storeNo}`;
    stompClient.subscribe(topic, (message) => {
      const newOrder = JSON.parse(message.body);
      // setOrders((prevOrders) => [...prevOrders, newOrder]);
      return newOrder;
    });
  });

  return () => {
    stompClient.disconnect();
  };
};
