select
  SUBSTRING(CONVERT(VARCHAR, Visits.StartDateTime, 126), 1, 10) as [Date],
  COUNT(*) as VisitsCount,
  SUM(Visits.Value) as Value,
  SUM(Visits.Value) / COUNT(*) as ValuePerVisit
from
  Visits
group by
  SUBSTRING(CONVERT(VARCHAR, Visits.StartDateTime, 126), 1, 10)
order by
  [Date]