import React, { useCallback, useMemo, useRef } from 'react';
import { useApi } from 'hooks';
import { useSetState } from 'react-use';
import { Row, Col, Input } from 'antd';
import { Table } from 'components';
import { debounce } from 'lodash';

const DEFAULT_PARAMS = {
  search: '',
  page: 1,
  limit: 10,
  sort: {
    field: 'createdAt',
    type: 'DESC',
  },
};

const UsersPage = () => {
  const [params, setParams] = useSetState({ ...DEFAULT_PARAMS });
  const searchRef = useRef(null);
  const response = useApi(
    `
    query($params: PaginationParams!) {
      users(paginate: $params) {
        ... on UserEntity {
          id
          email
          username
        }
      }
    }
  `,
    { params }
  );

  const parsedData = useMemo(() => {
    const { data, error } = response;
    const headers = data?.headers;

    return {
      error,
      data: data?.data?.users,
      meta: (headers && JSON.parse(headers.get('meta'))) || {},
    };
  }, [response]);

  const columns = [
    {
      title: 'id',
      key: 'id',
      dataIndex: 'id',
      width: 250,
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'Username',
      key: 'username',
      dataIndex: 'username',
    },
  ];

  const debounceChange = useCallback(
    debounce(() => {
      setParams({ search: searchRef.current.state.value });
    }, 500),
    []
  );

  return (
    <div>
      <Row style={{ marginBottom: 16 }}>
        <Col span={10}>
          <Input
            ref={searchRef}
            onChange={debounceChange}
            placeholder={'Search by name.....'}
            allowClear={true}
            onClear={() => setParams({ search: '' })}
          />
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Table
            loading={response.isValidating}
            rowKey={'id'}
            bordered
            columns={columns}
            dataSource={parsedData?.data}
            pagination={{
              total: parsedData?.meta?.totalDocs,
              pageSize: 10,
              showSizeChanger: false,
              hideOnSinglePage: true,
              onChange: (page) => setParams({ page }),
              current: params?.page,
            }}
          />
        </Col>
      </Row>
    </div>
  );
};

export default UsersPage;
