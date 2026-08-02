<template>
  <div class="flex flex-col mt-3 flex-1">
    <DetailHeader></DetailHeader>

    <div class="tool-card">
      <div class="tool-content">
        <!-- 左侧：选项输入区 -->
        <div class="input-section">
          <el-form label-position="top">
            <el-form-item label="转盘选项（每行一个）">
              <el-input
                v-model="optionsText"
                type="textarea"
                :rows="8"
                placeholder="请输入转盘选项，每行一个"
              />
            </el-form-item>
          </el-form>
        </div>

        <!-- 右侧：转盘 + 结果 -->
        <div class="wheel-section">
          <div class="wheel-wrapper">
            <!-- 顶部指针 -->
            <div class="wheel-pointer"></div>

            <!-- SVG 转盘 -->
            <svg
              class="wheel-svg"
              :style="{ transform: `rotate(${rotation}deg)` }"
              viewBox="0 0 300 300"
            >
              <g v-for="(sector, i) in sectors" :key="i">
                <path
                  :d="sector.path"
                  :fill="sector.color"
                  stroke="#fff"
                  stroke-width="1.5"
                />
                <text
                  :x="sector.textX"
                  :y="sector.textY"
                  text-anchor="middle"
                  dominant-baseline="middle"
                  :transform="`rotate(${sector.textAngle}, ${sector.textX}, ${sector.textY})`"
                  fill="#fff"
                  font-size="13"
                  font-weight="600"
                  style="pointer-events: none; text-shadow: 0 1px 2px rgba(0,0,0,.3)"
                >
                  {{ sector.label }}
                </text>
              </g>
            </svg>

            <!-- 中心圆环（点击触发旋转） -->
            <button
              class="wheel-center"
              :class="{ 'is-spinning': isSpinning }"
              :disabled="isSpinning || options.length < 1"
              @click="spinWheel"
            >
              {{ isSpinning ? '旋转中' : '开始' }}
            </button>
          </div>

          <!-- 结果展示 -->
          <div v-if="result" class="result">
            结果：<span class="result-text">{{ result }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- desc -->
    <ToolDetail>
      <el-text>
        在线转盘工具，自定义选项后旋转转盘随机选择结果，支持多个选项和动画效果，可用于随机选择、抽奖等场景。
      </el-text>
    </ToolDetail>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import DetailHeader from '@/components/Layout/DetailHeader/DetailHeader.vue'
import ToolDetail from '@/components/Layout/ToolDetail/ToolDetail.vue'


const optionsText = ref('选项1\n选项2\n选项3\n选项4\n选项5');
const isSpinning = ref(false);
const result = ref('');
const rotation = ref(0);

const CX = 150;
const CY = 150;
const RADIUS = 148;

// 颜色列表
const colors = [
  '#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57',
  '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'
];

// 实时解析选项
const options = computed(() =>
  optionsText.value.split('\n').map(s => s.trim()).filter(Boolean)
);

// 选项变化时清除结果
watch(options, () => {
  if (!isSpinning.value) result.value = '';
});

// 计算每个扇形的 SVG 数据
const sectors = computed(() => {
  const count = options.value.length;
  if (count === 0) return [];

  // 仅1个选项：显示完整圆盘
  if (count === 1) {
    return [{
      path: `M ${CX} ${CY - RADIUS} A ${RADIUS} ${RADIUS} 0 1 1 ${CX} ${CY + RADIUS} A ${RADIUS} ${RADIUS} 0 1 1 ${CX} ${CY - RADIUS} Z`,
      color: colors[0],
      label: options.value[0],
      textX: String(CX),
      textY: String(CY),
      textAngle: 0,
    }];
  }

  const angle = 360 / count;

  return options.value.map((label, i) => {
    const startDeg = i * angle - 90;
    const endDeg = startDeg + angle;
    const startRad = (startDeg * Math.PI) / 180;
    const endRad = (endDeg * Math.PI) / 180;

    const x1 = CX + RADIUS * Math.cos(startRad);
    const y1 = CY + RADIUS * Math.sin(startRad);
    const x2 = CX + RADIUS * Math.cos(endRad);
    const y2 = CY + RADIUS * Math.sin(endRad);

    const largeArc = angle > 180 ? 1 : 0;
    const path = `M ${CX} ${CY} L ${x1.toFixed(2)} ${y1.toFixed(2)} A ${RADIUS} ${RADIUS} 0 ${largeArc} 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z`;

    // 文字位置：扇形中心角度方向，距圆心 60% 处
    const midDeg = startDeg + angle / 2;
    const midRad = (midDeg * Math.PI) / 180;
    const textR = RADIUS * 0.6;
    const textX = CX + textR * Math.cos(midRad);
    const textY = CY + textR * Math.sin(midRad);
    // 文字旋转角度（使文字沿径向排列）
    const textAngle = midDeg + 90;

    return {
      path,
      color: colors[i % colors.length],
      label,
      textX: textX.toFixed(2),
      textY: textY.toFixed(2),
      textAngle: Number(textAngle.toFixed(2)),
    };
  });
});

// 旋转转盘
const spinWheel = () => {
  if (isSpinning.value || options.value.length < 1) return;

  // 仅1个选项：直接显示结果
  if (options.value.length === 1) {
    result.value = options.value[0];
    return;
  }

  isSpinning.value = true;
  result.value = '';

  const count = options.value.length;
  const anglePerOption = 360 / count;

  // 随机旋转 3-5 圈 + 随机偏移
  const spins = 3 + Math.random() * 2;
  const randomOffset = Math.random() * 360;
  const totalRotation = 360 * spins + randomOffset;
  const startRotation = rotation.value;

  // 计算最终指向的选项
  const finalAngle = (startRotation + totalRotation) % 360;
  const selectedIndex = Math.floor(((360 - finalAngle) % 360) / anglePerOption) % count;

  // 动画
  const duration = 3000 + Math.random() * 2000;
  const startTime = performance.now();

  const animate = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easeOut = 1 - Math.pow(1 - progress, 3);
    rotation.value = startRotation + totalRotation * easeOut;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isSpinning.value = false;
      result.value = options.value[selectedIndex];
    }
  };

  requestAnimationFrame(animate);
};
</script>

<style scoped>
.tool-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.input-section {
  width: 100%;
}

.wheel-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.wheel-wrapper {
  position: relative;
  width: 300px;
  height: 300px;
}

/* SVG 转盘 */
.wheel-svg {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: visible;
}

/* 顶部指针 */
.wheel-pointer {
  position: absolute;
  top: -4px;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-top: 22px solid #ff6b6b;
  z-index: 20;
  filter: drop-shadow(0 2px 3px rgba(0,0,0,0.2));
}

/* 中心圆环按钮 */
.wheel-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 64px;
  height: 64px;
  border-radius: 50%;
  border: 3px solid #fff;
  background: linear-gradient(135deg, #ff9f43, #ff6b6b);
  color: #fff;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  z-index: 10;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  transition: transform 0.15s ease, box-shadow 0.15s ease, opacity 0.15s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  outline: none;
}

.wheel-center:hover:not(:disabled) {
  transform: translate(-50%, -50%) scale(1.08);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}

.wheel-center:active:not(:disabled) {
  transform: translate(-50%, -50%) scale(0.96);
}

.wheel-center:disabled,
.wheel-center.is-spinning {
  cursor: not-allowed;
  opacity: 0.75;
}

/* 结果 */
.result {
  font-size: 16px;
  font-weight: 600;
  color: var(--color-text);
  padding: 10px 20px;
  background-color: var(--color-bg);
  border-radius: var(--radius-tag);
  text-align: center;
}

.result-text {
  color: #ff6b6b;
}

@media (min-width: 768px) {
  .tool-content {
    flex-direction: row;
    align-items: flex-start;
  }

  .input-section {
    width: 38%;
    flex-shrink: 0;
  }

  .wheel-section {
    width: 62%;
  }
}
</style>