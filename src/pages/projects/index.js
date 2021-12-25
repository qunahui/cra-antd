import React, { useCallback, useMemo, useRef } from 'react';
import { useApi } from 'hooks';
import { useSetState } from 'react-use';
import { PlusOutlined } from '@ant-design/icons';
import { useHistory, Link } from 'react-router-dom';
import { Row, Col, Input, Button } from 'antd';
import { Table } from 'components';
import { debounce } from 'lodash';
import moment from 'moment';

const DEFAULT_PARAMS = {
  search: '',
  page: 1,
  limit: 10,
  sort: {
    field: 'createdAt',
    type: 'DESC',
  },
};

const ProjectsPage = () => {
  const history = useHistory();
  const [params, setParams] = useSetState({ ...DEFAULT_PARAMS });
  const searchRef = useRef(null);
  const response = useApi(
    `
    query($params: PaginationParams!) {
      projects(paginate: $params) {
       ... on ProjectEntity {
          id
          name
          location
          area
          startDate
          endDate
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
      data: data?.data?.projects,
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
      title: 'Name',
      key: 'name',
      dataIndex: 'name',
      render: function render(value, record) {
        return (
          <div>
            <Link to={`/projects/${record.id}`}>{value}</Link>
          </div>
        );
      },
    },
    {
      title: 'Location',
      key: 'location',
      dataIndex: 'location',
    },
    {
      title: 'Start Date',
      key: 'startDate',
      dataIndex: 'startDate',
      render: function render(value) {
        return moment(value).format('DD-MM-YYYY');
      },
    },
    {
      title: 'End Date',
      key: 'endDate',
      dataIndex: 'endDate',
      render: function render(value) {
        return moment(value).format('DD-MM-YYYY');
      },
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
      <Row style={{ marginBottom: 16 }} justify={'space-between'}>
        <Col span={10}>
          <Input
            ref={searchRef}
            onChange={debounceChange}
            placeholder={'Search by name.....'}
            allowClear={true}
            onClear={() => setParams({ search: '' })}
          />
        </Col>
        <Col>
          <Button
            onClick={() => history.push('/projects/create')}
            type={'primary'}
          >
            <PlusOutlined />
            Add new project
          </Button>
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

export default ProjectsPage;
