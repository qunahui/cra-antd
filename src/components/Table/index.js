import React, { useEffect, useRef } from 'react';
import { Table } from 'antd';

const CustomTable = ({ dataSource, loading, ...rest }) => {
  console.log('receive: ', dataSource);
  const tableRef = useRef(null);

  useEffect(() => {
    if (dataSource) {
      tableRef.current = dataSource;
    }
  }, [dataSource]);

  const tableData = loading ? tableRef.current : dataSource;

  return <Table loading={loading} dataSource={tableData} {...rest} />;
};

export default CustomTable;
