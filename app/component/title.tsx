import Typography from "@mui/material/Typography";

interface Props {
  title: string;
}
export default function Title({ title }: Readonly<Props>) {
  return (
    <Typography className="pt-2  text-2xl text-gwColor-charcoal">
      {title}
    </Typography>
  );
}
