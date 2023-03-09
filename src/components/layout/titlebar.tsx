import styled from '@emotion/styled'
import { IconMinus, IconX } from '@tabler/icons-react'
import { appWindow } from '@tauri-apps/api/window'
const TitleBarStyled = styled.div`
  height: 40px;
  width: 100%;
  background: transparent;
  user-select: none;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;

  :hover {
    svg {
      opacity: 1;
    }
  }
`
const CloseButtonStyled = styled.span`
  border-radius: 50%;
  width: 12px;
  height: 12px;
  background-color: ${(p) => p.theme.colors.red[5]};
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 8px;
  cursor: pointer;
  svg {
    transition: all linear 250ms;
    opacity: 0;
    width: 10px;
    height: 10px;
  }
`
const MinusButtonStyled = styled(CloseButtonStyled)`
  background-color: ${(p) => p.theme.colors.orange[5]};
`

export const TitleBar = () => {
  return (
    <TitleBarStyled data-tauri-drag-region>
      <CloseButtonStyled
        onClick={() => {
          appWindow.close()
        }}
      >
        <IconX />
      </CloseButtonStyled>
      <MinusButtonStyled
        onClick={() => {
          appWindow.minimize()
        }}
      >
        <IconMinus />
      </MinusButtonStyled>
    </TitleBarStyled>
  )
}
