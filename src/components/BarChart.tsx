import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// data: [{label, value}] donde value es 0..10
export default function BarChart({ title, data }:{ title:string; data:{label:string, value:number}[] }){
  const max = 10;
  
  if (data.length === 0) {
    return (
      <View style={styles.container}>
        {title ? <Text style={styles.title}>{title}</Text> : null}
        <Text style={styles.emptyText}>Sin datos aún</Text>
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      <View style={styles.chartContainer}>
        {data.map((d, i) => {
          const value = Math.max(0, Math.min(10, d.value || 0));
          const h = (value / max) * 120; // altura máxima 120px
          const barColor = value >= 7 ? '#ff4444' : value >= 4 ? '#ffaa00' : '#44cc99';
          
          return (
            <View key={i} style={styles.barWrapper}>
              <Text style={styles.valueText}>{value > 0 ? value.toFixed(1) : ''}</Text>
              <View style={[styles.bar, { height: Math.max(4, h), backgroundColor: barColor }]} />
              <Text style={styles.labelText}>{d.label}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
    marginBottom: 12,
    color: '#333',
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    minHeight: 140,
    paddingBottom: 4,
  },
  barWrapper: {
    alignItems: 'center',
    flex: 1,
    maxWidth: 60,
  },
  valueText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
    minHeight: 14,
  },
  bar: {
    width: 24,
    borderTopLeftRadius: 6,
    borderTopRightRadius: 6,
    minHeight: 4,
  },
  labelText: {
    fontSize: 10,
    color: '#999',
    marginTop: 4,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    paddingVertical: 20,
  },
});