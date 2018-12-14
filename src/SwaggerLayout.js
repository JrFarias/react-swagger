import React from 'react';

const onFilterChange = (event, layoutActions) => {
  const { target: { value } } = event;

  layoutActions.updateFilter(value)
}

const SwaggerLayout = ({ specSelectors, specActions, getComponent, layoutSelectors, layoutActions }) => {
    const info = specSelectors.info();
    const url = specSelectors.url();
    const basePath = specSelectors.basePath();
    const host = specSelectors.host();
    const securityDefinitions = specSelectors.securityDefinitions();
    const externalDocs = specSelectors.externalDocs();
    const schemes = specSelectors.schemes();

    const Info = getComponent('info');
    const Operations = getComponent('operations', true);
    const Models = getComponent('Models', true);
    const AuthorizeBtn = getComponent('authorizeBtn', true);
    const Row = getComponent('Row');
    const Col = getComponent('Col');
    const Errors = getComponent('errors', true);

    const isLoading = specSelectors.loadingStatus() === 'loading';
    const isFailed = specSelectors.loadingStatus() === 'failed';
    const filter = layoutSelectors.currentFilter();

    let inputStyle = {};
    if (isFailed) {
      inputStyle.color = 'red';
    }

    if (isLoading) {
      inputStyle.color = '#aaa';
    }

    const Schemes = getComponent('schemes');

    const isSpecEmpty = !specSelectors.specStr();

    if (isSpecEmpty) {
      return <h4>No spec provided.</h4>
    }

    return (
      <div className='swagger-ui'>
        <div>
          <Errors/>
          <Row className='information-container'>
            <Col mobile={12}>
              {
                info.count()
                  ? (<Info
                      info={info}
                      url={url}
                      host={host}
                      basePath={basePath}
                      externalDocs={externalDocs}
                      getComponent={getComponent}/>)
                  : null
              }
            </Col>
          </Row>
          { (schemes && schemes.size) || securityDefinitions
            ? (
                <div className='scheme-container'>
                  <Col className='schemes wrapper' mobile={12}>
                    { schemes && schemes.size
                      ? <Schemes
                          currentScheme={specSelectors.operationScheme()}
                          schemes={ schemes }
                          specActions={ specActions }
                        />
                      : null
                    }
                    { securityDefinitions ? <AuthorizeBtn /> : null }
                  </Col>
                </div>
              )
            : null
          }
          {
            filter === null || filter === false
            ? null
            : <div className='filter-container'>
                <Col className='filter wrapper' mobile={12}>
                  <input
                    className='operation-filter-input'
                    placeholder='Filter by tag'
                    type='text'
                    onChange={(e) => onFilterChange(e, layoutActions)}
                    value={filter === true || filter === 'true' ? '' : filter}
                    disabled={isLoading}
                    style={inputStyle}
                  />
                </Col>
              </div>
          }
          <Row>
            <Col mobile={12} desktop={12} >
              <Models/>
            </Col>
          </Row>
          <Row>
            <Col mobile={12} desktop={12} >
              <Operations/>
            </Col>
          </Row>
        </div>
      </div>
    )
}

export default SwaggerLayout;
