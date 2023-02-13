/* eslint-disable */
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MutationFunction, useIsMutating, useMutation, useQuery, useQueryClient } from 'react-query';
import { useModal } from '../../common/modal/ModalRecoil';
import { useRecoilState } from 'recoil';
import { atom } from 'recoil';

/**
 * type
 */

type pvoType = {
  lginId: string;
  mbrNo: string;
  rechTypCd: string;
  stdSetVal: string;
  rechAmt: string;
};

type resType = {
  code: string;
  message: string;
};

const defaultRes: resType = {
  code: '',
  message: '',
};

const defaultPvo: pvoType = {
  lginId: 'mem',
  mbrNo: '1234567897',
  rechTypCd: '1010',
  stdSetVal: '0',
  rechAmt: '0',
};

const pvo1: pvoType = {
  lginId: 'mem',
  mbrNo: '1234567897',
  rechTypCd: '1010',
  stdSetVal: '10000',
  rechAmt: '20000',
};

const pvo2: pvoType = {
  lginId: 'mem',
  mbrNo: '1234567897',
  rechTypCd: '1010',
  stdSetVal: '10000',
  rechAmt: '30000',
};

const pvo3: pvoType = {
  lginId: 'mem',
  mbrNo: '1234567897',
  rechTypCd: '1010',
  stdSetVal: '10000',
  rechAmt: '40000',
};

const aaaa = atom({
  key: 'ejrlkwjlrkw',
  default: defaultPvo,
});

const EduUseMutation = () => {
  /**
   * array
   */
  const [pvo, setPvo] = useState<pvoType>(defaultPvo);
  const [test, setTest] = useState(true);
  const [debouncing, setDebouncing] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isRegister, setIsResgister] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [pp, setPp] = useRecoilState(aaaa);

  /**
   * object
   */
  const { showAlertModal } = useModal();
  const queryClient = useQueryClient();
  const isMutating = useIsMutating();

  /**
   * func
   */

  const abc = (data: any, func?: any) => {
    if (data.code && data.code === 'M01') {
      showAlertModal('알림', `[${data.code}] : ${data.message}`);
      func();
    } else {
      showAlertModal('알림', `[${data.code}] : ${data.message}`);
    }
  };

  /**
   * API
   */
  const getRequest = async ({ queryKey }: any) => {
    const { data } = await axios.post(`http://localhost:8080/api/money/money-rsv-recharge-get`, queryKey[1]);
    return data;
  };

  const { data: infoRespon } = useQuery(['post', defaultPvo], getRequest, {
    suspense: true,
    retry: false,
    staleTime: 1000,
    refetchOnWindowFocus: false,
    useErrorBoundary: true,
    cacheTime: 3000,
    refetchOnReconnect: false,
    onSuccess: (infoRespon) => {
      console.log('infoRespon', infoRespon);
      abc(infoRespon);
    },
  });

  const regRequest = async (request: pvoType) => {
    const { data } = await axios.post(`http://localhost:8080/api/money/money-rsv-recharge-reg`, request);
    return data;
  };

  const updRequest = async (request: pvoType) => {
    const { data } = await axios.post(`http://localhost:8080/api/money/money-rsv-recharge-upd`, request);
    return data;
  };

  const delRequest = async (request: pvoType) => {
    const { data } = await axios.post(`http://localhost:8080/api/money/money-rsv-recharge-del`, request);
    return data;
  };


  const makeRequest = (func: MutationFunction<pvoType, any>) => {
    const mutation = useMutation({
      mutationFn: func,
      useErrorBoundary: true,
      retry: false,
      onSuccess: (res) => {
        abc(res);
        queryClient.invalidateQueries('post');
      },
    });
    return mutation;
  };

  const regMutation = makeRequest(regRequest);
  const updMutation = makeRequest(updRequest);
  const delMutation = makeRequest(delRequest);


  /**
   * useEffect
   */

  useEffect(() => {
    if (debouncing) {

      if (isRegister) regMutation.mutate(pvo);
      if (isUpdate) updMutation.mutate(pvo);
      if (isDelete) delMutation.mutate(pvo);

      setIsUpdate(false);
      setIsResgister(false);
      setIsDelete(false);
    }

    if (!debouncing) {
      const timeoutId = setTimeout(() => {
        setDebouncing(true);
      }, 1000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [debouncing, isRegister, isUpdate, isDelete]);

  return (
    <section>
      <span>충전 설정</span>
      &nbsp;
      <span>{`[충전 조건 ${infoRespon?.response?.rechTypCd ?? pvo.rechTypCd}]`}</span>
      &nbsp;
      <span>{`[기준 금액 ${infoRespon?.response?.stdSetVal ?? pvo.stdSetVal}]`}</span>
      &nbsp;
      <span>{`[충전 금액 ${infoRespon?.response?.rechAmt ?? pvo.rechAmt}] `}</span>
      <div>
        <button
          type="button"
          onClick={() => {
            setTest(!test);
          }}
        >
          버어어어어어튼
        </button>
      </div>
      <div>
        <div>예약 충전 설정</div>
        <span>회원번호?</span>
        <input type="text" value={pvo.mbrNo} onChange={(e) => setPvo({ ...pvo, mbrNo: e.target.value })} />
        <span>얼마 이하면 충전하겠는가?</span>
        <input type="text" value={pvo.stdSetVal} onChange={(e) => setPvo({ ...pvo, stdSetVal: e.target.value })} />
        <span>금액은?</span>
        <input type="text" value={pvo.rechAmt} onChange={(e) => setPvo({ ...pvo, rechAmt: e.target.value })} />
        <button
          onClick={() => {
            setIsResgister(true);
            setDebouncing(false);
          }}
        >
          등록
        </button>
      </div>
      <br />
      <div>
        <div>예약 충전 변경</div>
        <span>회원번호?</span>
        <input type="text" value={pvo.mbrNo} onChange={(e) => setPvo({ ...pvo, mbrNo: e.target.value })} />
        <span>얼마 이하면 충전하겠는가?</span>
        <input type="text" value={pvo.stdSetVal} onChange={(e) => setPvo({ ...pvo, stdSetVal: e.target.value })} />
        <span>금액은?</span>
        <input type="text" value={pvo.rechAmt} onChange={(e) => setPvo({ ...pvo, rechAmt: e.target.value })} />
        <button
          onClick={() => {
            setIsUpdate(true);
            setDebouncing(false);
          }}
        >
          업데이트
        </button>
      </div>
      <br />
      <div>
        <div>예약 충전 삭제</div>
        <span>삭제하겠는가?</span>
        <button
          type="button"
          onClick={() => {
            setIsDelete(true);
            setDebouncing(false);
          }}
        >
          삭제
        </button>
      </div>
    </section>
  );
};

export default EduUseMutation;
