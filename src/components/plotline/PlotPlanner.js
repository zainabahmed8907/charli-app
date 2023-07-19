import React, { useState } from 'react';
import { useEffect } from 'react';
import {
  VictoryChart,
  VictoryLine,
  VictoryLabel,
  VictoryAxis,
  VictoryScatter,
  VictoryTheme,
  VictoryCursorContainer,
  VictoryGroup
} from 'victory';

const PlotPlanner = (props) => {
  const { cursorEnableFunc, enableCursor, data, editPlotlineHandler } = props;

  useEffect(() => {
    console.log('enablecursor', enableCursor);
  }, [props?.enableCursor]);

  const [state, setState] = useState({
    cursorValue: null,
    index: null,
    length: props?.length,
    showLenghtLabel: props?.showLenghtLabel
  });

  const handleCursorChange = () => {
    const { cursorValue, index } = state;
    console.log('cursor value', cursorValue, data, index);
    if (index != null && cursorValue != null) {
      var index_split = index.split('||');
      var newData = data;
      newData[index_split[0]].data[index_split[1]]['x'] = cursorValue.x;
      newData[index_split[0]].data[index_split[1]]['y'] = cursorValue.y;
      console.log('calling');
      props?.onChange(newData);
    }
  };

  const onEndCursor = () => {
    const { cursorValue, index } = state;
    if (index != null && cursorValue != null) {
      setState({ index: null, enableCursor: false });
    }
  };

  return (
    <div style={{ padding: 10 }} onClick={() => editPlotlineHandler()}>
      <VictoryChart
        theme={VictoryTheme.material}
        width={1600}
        height={800}
        domain={[1, 5]}
        maxDomain={{ x: 5, y: 5 }}
        containerComponent={
          enableCursor ? (
            <VictoryCursorContainer
              onFinish={() => console.log('finish')}
              onEndCursor={() => console.log('cursor end')}
              onCursorChange={(value, props) => {
                console.log('eeeee', enableCursor);
                if (enableCursor) {
                  console.log('calls', value);
                  setState({ ...state, cursorValue: value });
                  handleCursorChange();
                }
              }}
              onTouchEnd={() => {
                console.log('on touch end');
                onEndCursor();
              }}
            />
          ) : undefined
        }
      >
        <VictoryAxis
          style={{
            axis: { stroke: 'transparent' },
            ticks: {
              stroke: 'transparent'
            },
            tickLabels: {
              stroke: 'transparent'
            }
          }}
          width={1600}
        />
        {data.map((i, e) => {
          return (
            <VictoryGroup data={data[e].data}>
              <VictoryLine
                interpolation="natural"
                width={300}
                height={300}
                theme={VictoryTheme.material}
                style={{
                  data: {
                    stroke: data[e].lineColor,
                    strokeDasharray: '8,8',
                    zIndex: 1111
                  },
                  labels: {
                    visibility: 'hidden',
                    fontSize: 11,
                    fill: '#c43a31'
                  }
                }}
              />
              <VictoryScatter
                size={({ active }) => 10}
                style={{
                  axis: { stroke: 'none' },
                  data: {
                    fill: data[e].pointerColor
                  }
                }}
                labels={({ datum }) => datum.custom_label}
                labelComponent={
                  <VictoryLabel
                    className="victory-label"
                    dy={-30}
                    backgroundStyle={{ fill: '#F7F7F7' }}
                    textAnchor="start"
                    backgroundPadding={7}
                  />
                }
                data={data[e].data}
                events={[
                  {
                    target: 'data',
                    eventHandlers: {
                      onClick: () => {
                        return [
                          {
                            target: 'data',
                            mutation: (props) => {
                              console.log('props', props.text);
                              console.log('hello');
                              cursorEnableFunc();
                              setState({
                                ...state,
                                index: e + '||' + props.index
                              });
                            }
                          }
                        ];
                      }
                    }
                  }
                ]}
              />
            </VictoryGroup>
          );
        })}
      </VictoryChart>
    </div>
  );
};

export default PlotPlanner;
