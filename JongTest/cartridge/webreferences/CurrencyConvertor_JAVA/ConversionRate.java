/**
 * ConversionRate.java
 *
 * This file was auto-generated from WSDL
 * by the Apache Axis 1.4 Apr 22, 2006 (06:55:48 PDT) WSDL2Java emitter.
 */

package currencyconvertor;

public class ConversionRate  implements java.io.Serializable {
    private currencyconvertor.Currency fromCurrency;

    private currencyconvertor.Currency toCurrency;

    public ConversionRate() {
    }

    public ConversionRate(
           currencyconvertor.Currency fromCurrency,
           currencyconvertor.Currency toCurrency) {
           this.fromCurrency = fromCurrency;
           this.toCurrency = toCurrency;
    }


    /**
     * Gets the fromCurrency value for this ConversionRate.
     * 
     * @return fromCurrency
     */
    public currencyconvertor.Currency getFromCurrency() {
        return fromCurrency;
    }


    /**
     * Sets the fromCurrency value for this ConversionRate.
     * 
     * @param fromCurrency
     */
    public void setFromCurrency(currencyconvertor.Currency fromCurrency) {
        this.fromCurrency = fromCurrency;
    }


    /**
     * Gets the toCurrency value for this ConversionRate.
     * 
     * @return toCurrency
     */
    public currencyconvertor.Currency getToCurrency() {
        return toCurrency;
    }


    /**
     * Sets the toCurrency value for this ConversionRate.
     * 
     * @param toCurrency
     */
    public void setToCurrency(currencyconvertor.Currency toCurrency) {
        this.toCurrency = toCurrency;
    }

    private java.lang.Object __equalsCalc = null;
    public synchronized boolean equals(java.lang.Object obj) {
        if (!(obj instanceof ConversionRate)) return false;
        ConversionRate other = (ConversionRate) obj;
        if (obj == null) return false;
        if (this == obj) return true;
        if (__equalsCalc != null) {
            return (__equalsCalc == obj);
        }
        __equalsCalc = obj;
        boolean _equals;
        _equals = true && 
            ((this.fromCurrency==null && other.getFromCurrency()==null) || 
             (this.fromCurrency!=null &&
              this.fromCurrency.equals(other.getFromCurrency()))) &&
            ((this.toCurrency==null && other.getToCurrency()==null) || 
             (this.toCurrency!=null &&
              this.toCurrency.equals(other.getToCurrency())));
        __equalsCalc = null;
        return _equals;
    }

    private boolean __hashCodeCalc = false;
    public synchronized int hashCode() {
        if (__hashCodeCalc) {
            return 0;
        }
        __hashCodeCalc = true;
        int _hashCode = 1;
        if (getFromCurrency() != null) {
            _hashCode += getFromCurrency().hashCode();
        }
        if (getToCurrency() != null) {
            _hashCode += getToCurrency().hashCode();
        }
        __hashCodeCalc = false;
        return _hashCode;
    }

    // Type metadata
    private static org.apache.axis.description.TypeDesc typeDesc =
        new org.apache.axis.description.TypeDesc(ConversionRate.class, true);

    static {
        typeDesc.setXmlType(new javax.xml.namespace.QName("http://www.webserviceX.NET/", ">ConversionRate"));
        org.apache.axis.description.ElementDesc elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("fromCurrency");
        elemField.setXmlName(new javax.xml.namespace.QName("http://www.webserviceX.NET/", "FromCurrency"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.webserviceX.NET/", "Currency"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
        elemField = new org.apache.axis.description.ElementDesc();
        elemField.setFieldName("toCurrency");
        elemField.setXmlName(new javax.xml.namespace.QName("http://www.webserviceX.NET/", "ToCurrency"));
        elemField.setXmlType(new javax.xml.namespace.QName("http://www.webserviceX.NET/", "Currency"));
        elemField.setNillable(false);
        typeDesc.addFieldDesc(elemField);
    }

    /**
     * Return type metadata object
     */
    public static org.apache.axis.description.TypeDesc getTypeDesc() {
        return typeDesc;
    }

    /**
     * Get Custom Serializer
     */
    public static org.apache.axis.encoding.Serializer getSerializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanSerializer(
            _javaType, _xmlType, typeDesc);
    }

    /**
     * Get Custom Deserializer
     */
    public static org.apache.axis.encoding.Deserializer getDeserializer(
           java.lang.String mechType, 
           java.lang.Class _javaType,  
           javax.xml.namespace.QName _xmlType) {
        return 
          new  org.apache.axis.encoding.ser.BeanDeserializer(
            _javaType, _xmlType, typeDesc);
    }

}
