import React from 'react';
import {Ionicons} from '@expo/vector-icons';

interface IconProps {
  color: string;
  size: number;
  focused: boolean;
}
/**
 * Camera Icon
 * @param {IconProps} props
 * @return {React.FC<IconProps>}
 */
export const CamIcon: React.FC<IconProps> = (props: IconProps) => {
  return <Ionicons name={'md-camera'} color={props.color} size={props.size} />;
};
/**
 * Home Icon
 * @param {IconProps} props
 * @return {React.FC<IconProps>}
 */
export const HomeIcon: React.FC<IconProps> = (props: IconProps) => (
  <Ionicons name={'md-home'} color={props.color} size={props.size} />
);

/**
 * Social Icon
 * @param {IconProps} props
 * @return {React.FC<IconProps>}
 */
export const SocialIcon: React.FC<IconProps> = (props: IconProps) => (
  <Ionicons name={'md-cloud'} color={props.color} size={props.size} />
);

/**
 * Reverse Camera Icon
 * @param {IconProps} props
 * @return {React.FC<IconProps>}
 */
export const RevCamIcon: React.FC<IconProps> = (props: IconProps) => {
  return (
    <Ionicons
      name={'md-reverse-camera'}
      color={props.color}
      size={props.size}
    />
  );
};
