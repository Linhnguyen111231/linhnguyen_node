import { useEffect } from "react"

import { createSocketConnection } from "@myapp/services"
import { useAppContext } from "@myapp/app-context"

function listen(callBack, channel, event) {
  window.Echo.private(channel).listen(event, payload => {
    callBack(payload)
  })

  return function cleanUp() {
    window.Echo.leaveChannel(`private-${channel}`)
  }
}

export const useSocket = ({ type, callBack }) => {
  const [appState] = useAppContext()
  useEffect(() => {
    createSocketConnection(appState.authentication.accessToken)
    switch (type) {
      case "NEW_ORDER": {
        return listen(
          callBack,
          `customer.${appState.user.id}.orders`,
          ".new_order"
        )
      }
      case "ORDER_UPDATED": {
        return listen(
          callBack,
          `customer.${appState.user.id}.orders`,
          ".order_updated"
        )
      }
      case "ORDER_UPDATED_NOTICE": {
        return listen(
          callBack,
          `customer.${appState.user.id}.notice`,
          ".order_update_notice"
        )
      }
    }
  })
}
