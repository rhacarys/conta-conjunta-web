import { YStack, styled } from "tamagui";

/**
 * A responsive wrapper that centers content on wide screens (Web/Tablets)
 * while expanding to full width on native mobile devices.
 */
export const ResponsiveContainer = styled(YStack, {
  name: "ResponsiveContainer",
  flex: 1,
  width: "100%",
  backgroundColor: "$background",

  $gtSm: {
    maxWidth: 480,
    marginHorizontal: "auto",
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "$borderColor",
  },

  $gtMd: {
    maxWidth: 520,
  },
});
