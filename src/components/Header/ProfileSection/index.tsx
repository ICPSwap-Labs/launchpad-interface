import React, { useEffect, useRef, useState } from "react";
import { makeStyles, useTheme } from "@mui/styles";
import { Chip, List, Paper, Popper, ButtonBase, Box, Typography, useMediaQuery, SvgIcon, Fade } from "@mui/material";
import { shortenAddress } from "utils/sdk/index";
import { Trans, t } from "@lingui/macro";
import LogOutSection from "../LogOutSection";
import { useAccount } from "store/global/hooks";
import ClickAwayListener from "@mui/base/ClickAwayListener";
import { useIsUnLocked, useWalletType } from "store/auth/hooks";
import { Connector } from "actor/Actor";
import { Theme } from "@mui/material/styles";
import { useUserLogout } from "store/auth/hooks";
import Account from "./Account";
import Principal from "./Principal";
import LogoutIcon from "./LogoutIcon";
import { useWalletConnectorManager } from "store/auth/hooks";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    backgroundColor: "#fff",
    borderRadius: "12px",
  },
  navContainer: {
    width: "100%",
    maxWidth: "350px",
    minWidth: "300px",
    borderRadius: "10px",
    padding: "0",
    [theme.breakpoints.down("sm")]: {
      minWidth: "100%",
      maxWidth: "280px",
    },
  },
  profileChip: {
    height: "48px",
    alignItems: "center",
    borderRadius: "27px",
    transition: "all .2s ease-in-out",
    borderColor: theme.palette.mode === "dark" ? theme.palette.dark.main : theme.palette.primary.light,
    backgroundColor: theme.palette.mode === "dark" ? theme.palette.dark.main : theme.palette.primary.light,
    '&[aria-controls="menu-list-grow"], &:hover': {
      borderColor: theme.palette.primary.main,
      background: theme.palette.primary.main + "!important",
      color: theme.palette.primary.light,
      "& svg": {
        stroke: theme.palette.primary.light,
      },
    },
  },
  profileLabel: {
    lineHeight: 0,
    padding: "12px",
  },
  listItem: {
    paddingLeft: "30px",
    wordBreak: "break-all",
    display: "flex",
    height: "52px",
    alignItems: "center",
    cursor: "pointer",
    "&:hover": {
      background: "#F5F5FF",
    },
    "& .MuiTypography-root": {
      color: "#111936",
      marginLeft: "10px",
    },
  },
  name: {
    marginLeft: "2px",
    fontWeight: 400,
  },
  box: {
    marginLeft: "16px",
    [theme.breakpoints.down("sm")]: {
      marginLeft: "8px",
    },
  },
  profileRoot: {
    background: theme.palette.mode === "dark" ? theme.themeOption.defaultGradient : theme.colors.lightPrimaryMain,
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    "&:hover": {
      backgroundColor:
        theme.palette.mode === "dark"
          ? theme.themeOption.defaultGradient
          : `${theme.colors.lightPrimaryMain}!important`,
    },
  },
  account: {
    wordBreak: "break-all",
    cursor: "pointer",
  },
  copyButton: {
    position: "relative",
    top: "3px",
    marginLeft: "3px",
  },
}));

export function ICRocksLoadIcon(props: any) {
  return (
    <SvgIcon viewBox="0 0 15 14" {...props}>
      <path fillRule="evenodd" clipRule="evenodd" d="M0 0H6V2H2V12H12V8H14V14H0V0Z" />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.7865 2H8.40071V0H13.0033H14.0033V1V5.60261H12.0033V3.6116L5.81851 9.79641L4.4043 8.3822L10.7865 2Z"
      />
    </SvgIcon>
  );
}

export default function ProfileSection() {
  const classes = useStyles();
  const theme = useTheme() as Theme;
  const matchDownMD = useMediaQuery(theme.breakpoints.down("md"));
  const account = useAccount();
  const isUnlocked = useIsUnLocked();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement | null>(null);
  const prevOpen = useRef(open);
  const logout = useUserLogout();
  const walletType = useWalletType();

  const isPlugWallet = walletType === Connector.PLUG;

  const [, walletManager] = useWalletConnectorManager();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: MouseEvent | TouchEvent) => {
    if (anchorRef.current && anchorRef.current.contains(event.target as Node)) return;
    setOpen(false);
  };

  const handleConnectWallet = async () => {
    await logout();
    walletManager(true);
  };

  useEffect(() => {
    if (anchorRef.current && prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }
    prevOpen.current = open;
  }, [open]);

  return (
    <React.Fragment>
      <Box component="span" className={classes.box}>
        <ButtonBase sx={{ borderRadius: "12px" }}>
          <Chip
            ref={anchorRef}
            classes={{ root: classes.profileRoot, label: classes.profileLabel }}
            label={
              !isUnlocked && isPlugWallet ? t`Connect Wallet` : !!account ? shortenAddress(account) : t`Connect Wallet`
            }
            variant="outlined"
            onClick={account ? handleToggle : handleConnectWallet}
            color="primary"
          />
        </ButtonBase>
      </Box>

      {/* @ts-ignore */}
      <Popper
        placement={matchDownMD ? "bottom-start" : "bottom-end"}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: "offset",
              options: {
                offset: [matchDownMD ? 200 : 0, 14],
              },
            },
          ],
        }}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper>
              <Box className={classes.paper}>
                <ClickAwayListener onClickAway={handleClose}>
                  <List component="nav" className={classes.navContainer}>
                    <Box sx={{ padding: "12px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)" }}>
                      <Box sx={{ marginBottom: "12px" }}>
                        <Account />
                      </Box>
                      <Box>
                        <Principal />
                      </Box>
                    </Box>

                    <LogOutSection onLogout={() => setOpen(false)}>
                      <Box className={classes.listItem} sx={{ borderRadius: "0 0 12px 12px" }}>
                        <LogoutIcon />
                        <Typography>
                          <Trans>Logout</Trans>
                        </Typography>
                      </Box>
                    </LogOutSection>
                  </List>
                </ClickAwayListener>
              </Box>
            </Paper>
          </Fade>
        )}
      </Popper>
    </React.Fragment>
  );
}
